import { Knex } from 'knex';
import { LocalDbMeta } from './local/local.dbMeta.js';
import { LocalTransaction } from './local/local.transaction.js';

export interface ConfigDatabase {
  testDatabase: boolean;
  defaultClient: string;
  clients: Record<string, Knex.Config>;
  base: Knex.Config;
  bases: Record<string, Knex.Config>;
}

declare module '@cabloy/core' {
  export interface CabloyConfig {
    database: ConfigDatabase;
  }

  export interface CabloyContext {
    get db(): Knex | Knex.Transaction;
    get dbMeta(): LocalDbMeta;
    set dbMeta(value: LocalDbMeta);
    get transaction(): LocalTransaction;
  }
}
