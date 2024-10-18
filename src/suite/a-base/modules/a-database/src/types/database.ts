import { Knex } from 'knex';
import { LocalDbMeta } from '../local/local.dbMeta.js';
import { LocalTransaction } from '../local/local.transaction.js';
import { ConfigDatabase } from './config.js';

declare module 'vona' {
  export interface VonaConfig {
    database: ConfigDatabase;
  }

  export interface CabloyContext {
    get db(): Knex | Knex.Transaction;
    get dbMeta(): LocalDbMeta;
    set dbMeta(value: LocalDbMeta);
    get transaction(): LocalTransaction;
  }
}
