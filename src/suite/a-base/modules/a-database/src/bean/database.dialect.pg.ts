import { Bean } from '@cabloy/core';
import { IFetchDatabasesResultItem, VirtualDatabaseDialect } from './virtual.databaseDialect.js';
import { Knex } from 'knex';

@Bean({ scene: 'database.dialect' })
export class DatabaseDialectPg extends VirtualDatabaseDialect {
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

  async insert(builder: Knex.QueryBuilder): Promise<number[]> {
    builder.returning('id');
    const list = await builder;
    return list.map(item => item.id);
  }

  query(result) {
    return result.rows;
  }
}
