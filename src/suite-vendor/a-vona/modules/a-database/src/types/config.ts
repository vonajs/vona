import { Knex } from 'knex';
import { IDatabaseClientRecord } from './database.js';

export interface ConfigDatabase {
  testDatabase: boolean;
  defaultClient: string;
  clients: Record<keyof IDatabaseClientRecord, Knex.Config>;
  base: Knex.Config;
}
