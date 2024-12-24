import { Knex } from 'knex';
import { promisify } from 'node:util';
import {
  BeanDatabaseDialectBase,
  DatabaseDialect,
  IFetchDatabasesResultItem,
  IFetchIndexesResultItem,
  TableIdentity,
} from 'vona-module-a-database';

@DatabaseDialect()
export class DatabaseDialectMysql extends BeanDatabaseDialectBase {
  getConfigBase(): Knex.Config | undefined {
    return {
      pool: {
        afterCreate(conn, done) {
          mysql_afterCreate(conn).then(done).catch(done);
        },
      },
    };
  }

  async fetchDatabases(
    schemaBuilder: Knex.SchemaBuilder,
    databasePrefix: string,
  ): Promise<IFetchDatabasesResultItem[]> {
    const res = await schemaBuilder.raw(`show databases like '${databasePrefix}%'`);
    let dbs = res[0];
    dbs = dbs.map(db => {
      const name = db[Object.keys(db)[0]];
      return { name };
    });
    return dbs;
  }

  async createDatabase(schemaBuilder: Knex.SchemaBuilder, databaseName: string): Promise<void> {
    await schemaBuilder.raw(
      `CREATE DATABASE \`${databaseName}\` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci`,
    );
  }

  async dropDatabase(schemaBuilder: Knex.SchemaBuilder, databaseName: string): Promise<void> {
    await schemaBuilder.raw(`drop database \`${databaseName}\``);
  }

  async fetchIndexes(schemaBuilder: Knex.SchemaBuilder, tableName: string): Promise<IFetchIndexesResultItem[]> {
    const res: any = await schemaBuilder.raw(`show index from ${tableName}`);
    let items = res[0];
    items = items.map(item => {
      return {
        indexName: item.Key_name,
      };
    });
    return items;
  }

  async insert(builder: Knex.QueryBuilder): Promise<TableIdentity[]> {
    const items = await builder;
    return items;
  }

  query(result) {
    return result[0];
  }

  async viewDependents(builder: Knex.QueryBuilder, viewName: string): Promise<string[]> {
    const sqlViews = `
      SELECT T.TABLE_SCHEMA ref_schema,
        T.TABLE_NAME ref_name,
        V.TABLE_NAME dep_name,
        T.TABLE_TYPE type
      FROM INFORMATION_SCHEMA.TABLES T 
        INNER JOIN INFORMATION_SCHEMA.VIEWS V 
          ON V.TABLE_SCHEMA = T.TABLE_SCHEMA
          AND V.VIEW_DEFINITION LIKE CONCAT('%\`',T.TABLE_NAME,'\`%')
      WHERE T.TABLE_SCHEMA = DATABASE()
    `;
    const items = await builder
      .distinct('dep_name')
      .fromRaw(`(${sqlViews}) as viewDependents`)
      .where({ ref_name: viewName });
    return items.map(item => item.dep_name);
  }
}

async function mysql_afterCreate(conn) {
  await _executeQuery(conn, 'SET SESSION explicit_defaults_for_timestamp=ON');
  await _executeQuery(conn, "SET SESSION sql_mode='NO_AUTO_VALUE_ON_ZERO'");
}

async function _executeQuery(conn, sql) {
  const queryAsync = promisify(cb => conn.query(sql, cb));
  return await queryAsync();
}
