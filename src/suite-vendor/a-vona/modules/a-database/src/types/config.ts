import type { Knex } from 'knex';
import type { IDatabaseClientDialectRecord, IDatabaseClientRecord } from './database.ts';

export interface ConfigDatabaseClient extends Omit<Knex.Config, 'client'> {
  client: keyof IDatabaseClientDialectRecord;
}
export interface ConfigDatabase {
  testDatabase: boolean;
  defaultClient: keyof IDatabaseClientRecord;
  clients: Record<keyof IDatabaseClientRecord, ConfigDatabaseClient>;
  base: ConfigDatabaseClient;
}
