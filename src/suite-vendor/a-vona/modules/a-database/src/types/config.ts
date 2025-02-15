import type { Knex } from 'knex';
import type { IDatabaseClientRecord, IDatabaseClientDialectRecord } from './database.js';

export interface ConfigDatabaseClient extends Omit<Knex.Config, 'client'> {
  client?: keyof IDatabaseClientDialectRecord;
}
export interface ConfigDatabase {
  testDatabase: boolean;
  defaultClient: string;
  clients: Record<keyof IDatabaseClientRecord, ConfigDatabaseClient>;
  base: ConfigDatabaseClient;
}
