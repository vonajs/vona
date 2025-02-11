import knex, { Knex } from 'knex';
import { VonaApplication, cast } from 'vona';
import { IFetchDatabasesResultItem, IFetchIndexesResultItem } from '../bean/bean.databaseDialectBase.js';
import { IDatabaseClientDialectRecord } from '../types/database.js';

export function ExtendSchemaBuilder(app: VonaApplication) {
  ['fetchDatabases', 'createDatabase', 'dropDatabase', 'fetchIndexes'].forEach(function (method) {
    knex.SchemaBuilder.extend(method, async function (...args) {
      const client = cast<Knex.Client>(cast(this).client).config.client as keyof IDatabaseClientDialectRecord;
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
