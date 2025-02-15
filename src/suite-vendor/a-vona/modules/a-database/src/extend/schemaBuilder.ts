import type { Knex } from 'knex';
import knex from 'knex';
import type { VonaApplication } from 'vona';
import { cast } from 'vona';
import type { IFetchDatabasesResultItem, IFetchIndexesResultItem } from '../bean/bean.databaseDialectBase.js';
import type { IDatabaseClientDialectRecord } from '../types/database.js';

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
