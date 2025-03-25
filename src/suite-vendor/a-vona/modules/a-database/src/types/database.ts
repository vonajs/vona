import type { BeanModel } from '../bean/bean.model.ts';
import type { ServiceDbMeta } from '../service/dbMeta.ts';
import type { ServiceTransaction } from '../service/transaction.ts';
import type { ConfigDatabase } from './config.ts';

export interface IDatabaseClientRecord {
  pg: never;
  mysql: never;
}

export interface IDatabaseClientDialectRecord {
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
    get dbLevel(): number;
    set dbLevel(value: number | undefined);
    get dbMeta(): ServiceDbMeta;
    set dbMeta(value: ServiceDbMeta);
    get transaction(): ServiceTransaction;
  }
}
