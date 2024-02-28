import { Bean } from '@cabloy/core';
import { IFetchDatabasesResultItem, VirtualDatabaseDialect } from './virtual.databaseDialect.js';

@Bean({ scene: 'database.dialect' })
export class DatabaseDialectPg extends VirtualDatabaseDialect {
  async fetchDatabases(databasePrefix: string): Promise<IFetchDatabasesResultItem[]> {
    let dbs = await this.client.knex.select('datname').from('pg_database').whereILike('datname', `${databasePrefix}-%`);
    dbs = dbs.map(db => {
      return { name: db.datname };
    });
    return dbs;
  }

  async createDatabase(databaseName: string): Promise<void> {
    await this.client.knex.raw(`CREATE DATABASE ${databaseName} encoding=UTF8`);
  }

  async dropDatabase(databaseName: string): Promise<void> {
    await this.client.knex.raw(`DROP DATABASE ${databaseName}`);
  }
}
