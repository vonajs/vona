import { Knex } from 'knex';
import { ServiceDbMeta } from '../service/dbMeta.js';
import { ServiceTransaction } from '../service/transaction.js';
import { ConfigDatabase } from './config.js';
import { BeanModel } from '../bean/bean.model.js';

export interface IDatabaseClientRecord {
  pg: never;
  mysql: never;
}

export interface IDatabaseDialectRecord {
  pg: never;
  mysql: never;
  mysql2: never;
}

declare module 'vona' {
  export interface IBeanRecordGlobal {
    model: BeanModel;
  }

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
