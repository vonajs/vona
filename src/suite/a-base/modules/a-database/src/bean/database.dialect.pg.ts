import { Bean } from '@cabloy/core';
import { IFetchDatabasesResultItem, VirtualDatabaseDialect } from './virtual.databaseDialect.js';
import { Knex } from 'knex';

@Bean({ scene: 'database.dialect' })
export class DatabaseDialectPg extends VirtualDatabaseDialect {
  async fetchDatabases(databasePrefix: string): Promise<IFetchDatabasesResultItem[]> {
    const res: any = await this.schemaBuilder.raw(
      `select datname from pg_database where datname like '${databasePrefix}%'`,
    );
    let dbs = res.rows;
    dbs = dbs.map(db => {
      return { name: db.datname };
    });
    return dbs;
  }

  async createDatabase(databaseName: string): Promise<void> {
    await this.schemaBuilder.raw(`CREATE DATABASE "${databaseName}" encoding=UTF8`);
  }

  async dropDatabase(databaseName: string): Promise<void> {
    await this.schemaBuilder.raw(`DROP DATABASE "${databaseName}"`);
  }

  async insert(builder: Knex.QueryBuilder): Promise<number> {
    builder.returning('id');
    const list = await builder;
    return list[0].id;
  }
}
