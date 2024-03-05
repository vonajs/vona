import { Bean } from '@cabloy/core';
import { IFetchDatabasesResultItem, VirtualDatabaseDialect } from './virtual.databaseDialect.js';
import { Knex } from 'knex';

@Bean({ scene: 'database.dialect' })
export class DatabaseDialectMysql extends VirtualDatabaseDialect {
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

  async insert(builder: Knex.QueryBuilder): Promise<number[]> {
    const list = await builder;
    return list;
  }

  query(result) {
    return result[0];
  }
}
