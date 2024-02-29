import knex, { Knex } from 'knex';
import { IFetchDatabasesResultItem } from '../bean/virtual.databaseDialect.js';
import { CabloyApplication, Cast } from '@cabloy/core';

export function ExtendSchemaBuilder(app: CabloyApplication) {
  ['fetchDatabases', 'createDatabase', 'dropDatabase'].forEach(function (method) {
    knex.SchemaBuilder.extend(method, async function (...args) {
      const client = Cast<Knex.Client>(Cast(this).client).config.client as string;
      const dialect = app.bean.database.getDialect(client, this);
      return await dialect[method](...args);
    });
  });
}

declare module 'knex' {
  namespace Knex {
    interface SchemaBuilder {
      fetchDatabases(_databasePrefix: string): Promise<IFetchDatabasesResultItem[]>;
      createDatabase(_databaseName: string): Promise<void>;
      dropDatabase(_databaseName: string): Promise<void>;
    }
  }
}
