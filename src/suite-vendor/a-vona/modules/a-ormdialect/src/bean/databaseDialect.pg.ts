import type { Knex } from 'knex';
import type { TableIdentity } from 'table-identity';
import type {
  ConfigDatabaseClient,
  IFetchDatabasesResultItem,
  IFetchIndexesResultItem,
} from 'vona-module-a-orm';
import {
  BeanDatabaseDialectBase,
  DatabaseDialect,
} from 'vona-module-a-orm';

@DatabaseDialect()
export class DatabaseDialectPg extends BeanDatabaseDialectBase {
  getConfigBase(): ConfigDatabaseClient | undefined {
    return {
      connection: {
        // types: {
        //   getTypeParser: (oid: number, format: string): any => {
        //     if (oid === 114) return pgTypes.getTypeParser(25, 'text');
        //     return pgTypes.getTypeParser(oid, cast(format));
        //   },
        // },
      },
    } as unknown as ConfigDatabaseClient;
  }

  async fetchDatabases(
    schemaBuilder: Knex.SchemaBuilder,
    databasePrefix: string,
  ): Promise<IFetchDatabasesResultItem[]> {
    const res: any = await schemaBuilder.raw(`select datname from pg_database where datname like '${databasePrefix}%'`);
    let dbs = res.rows;
    dbs = dbs.map(db => {
      return { name: db.datname };
    });
    return dbs;
  }

  async createDatabase(schemaBuilder: Knex.SchemaBuilder, databaseName: string): Promise<void> {
    await schemaBuilder.raw(`CREATE DATABASE "${databaseName}" encoding=UTF8`);
  }

  async dropDatabase(schemaBuilder: Knex.SchemaBuilder, databaseName: string): Promise<void> {
    await schemaBuilder.raw(`DROP DATABASE "${databaseName}"`);
  }

  async fetchIndexes(schemaBuilder: Knex.SchemaBuilder, tableName: string): Promise<IFetchIndexesResultItem[]> {
    const res: any = await schemaBuilder.raw(
      `select indexname,indexdef from pg_indexes where tablename='${tableName}'`,
    );
    let items = res.rows;
    items = items.map(item => {
      return {
        indexName: item.indexname,
      };
    });
    return items;
  }

  async insert(builder: Knex.QueryBuilder): Promise<TableIdentity[]> {
    builder.returning('id');
    const items = await builder;
    return items.map(item => item.id);
  }

  query(result) {
    return result.rows;
  }

  async viewDependents(builder: Knex.QueryBuilder, viewName: string): Promise<string[]> {
    const sqlViews = `
      select
          ref_nsp.nspname ref_schema, ref_cl.relname ref_name,
          rwr_cl.relkind dep_type,
          rwr_nsp.nspname dep_schema,
          rwr_cl.relname dep_name
        from pg_depend dep
          join pg_class ref_cl on dep.refobjid = ref_cl.oid
          join pg_namespace ref_nsp on ref_cl.relnamespace = ref_nsp.oid
          join pg_rewrite rwr on dep.objid = rwr.oid
          join pg_class rwr_cl on rwr.ev_class = rwr_cl.oid
          join pg_namespace rwr_nsp on rwr_cl.relnamespace = rwr_nsp.oid
        where
          dep.deptype = 'n'
          and dep.classid = 'pg_rewrite'::regclass
    `;
    let items = await builder
      .distinct('dep_name')
      .fromRaw(`(${sqlViews}) as depend_view`)
      .where({ ref_name: viewName });
    items = items.map(item => item.dep_name);
    items = items.filter((item: string) => item.toLowerCase() !== viewName.toLowerCase());
    return items;
  }
}
