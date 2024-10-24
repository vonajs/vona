import knex, { Knex } from 'knex';
import { IFetchDatabasesResultItem, IFetchIndexesResultItem } from '../bean/virtual.databaseDialect.js';
import { VonaApplication, Cast } from 'vona';

export function ExtendSchemaBuilder(app: VonaApplication) {
  ['fetchDatabases', 'createDatabase', 'dropDatabase', 'fetchIndexes'].forEach(function (method) {
    knex.SchemaBuilder.extend(method, async function (...args) {
      const client = Cast<Knex.Client>(Cast(this).client).config.client as string;
      const dialect = app.bean.database.getDialect(client);
      return await dialect[method](this, ...args);
    });
  });
}

declare module 'knex' {
  namespace Knex {
    interface SchemaBuilder {
      fetchDatabases(databasePrefix: string): Promise<IFetchDatabasesResultItem[]>;
      createDatabase(databaseName: string): Promise<void>;
      dropDatabase(databaseName: string): Promise<void>;
      fetchIndexes(tableName: string): Promise<IFetchIndexesResultItem[]>;
    }
  }
}
