import { Bean } from '@cabloy/core';
import { IFetchDatabasesResultItem, VirtualDatabaseDialect } from './virtual.databaseDialect.js';

@Bean({ scene: 'database.dialect' })
export class DatabaseDialectMysql extends VirtualDatabaseDialect {
  async fetchDatabases(databasePrefix: string): Promise<IFetchDatabasesResultItem[]> {
    const res = await this.knex.raw(`show databases like '${databasePrefix}-%'`);
    let dbs = res[0];
    dbs = dbs.map(db => {
      const name = db[Object.keys(db)[0]];
      return { name };
    });
    return dbs;
  }
}
