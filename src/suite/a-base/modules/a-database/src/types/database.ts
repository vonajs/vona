import { Knex } from 'knex';
import { ServiceDbMeta } from '../service/dbMeta.js';
import { ServiceTransaction } from '../service/transaction.js';
import { ConfigDatabase } from './config.js';

declare module 'vona' {
  export interface VonaConfig {
    database: ConfigDatabase;
  }

  export interface VonaContext {
    get db(): Knex | Knex.Transaction;
    get dbMeta(): ServiceDbMeta;
    set dbMeta(value: ServiceDbMeta);
    get transaction(): ServiceTransaction;
  }
}
