import { Knex } from 'knex';
import { IDatabaseClientRecord, IDatabaseDialectRecord } from './database.js';

export interface ConfigDatabaseClient extends Omit<Knex.Config, 'client'> {
  client?: keyof IDatabaseDialectRecord;
}
export interface ConfigDatabase {
  testDatabase: boolean;
  defaultClient: string;
  clients: Record<keyof IDatabaseClientRecord, ConfigDatabaseClient>;
  base: ConfigDatabaseClient;
}
