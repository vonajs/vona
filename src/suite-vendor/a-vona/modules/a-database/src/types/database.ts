import type { FunctionAny } from 'vona';
import type { BeanModel } from '../bean/bean.model.ts';
import type { ConfigDatabase } from './config.ts';

export interface IDbInfo {
  level?: number;
  clientName?: keyof IDatabaseClientRecord;
}

export interface IDatabaseClientRecord {
  default: never;
  pg: never;
  mysql: never;
}

export interface IDatabaseClientDialectRecord {
  pg: never;
  mysql: never;
  mysql2: never;
}

export interface IDatabaseSwitchOptions {
  clientName?: keyof IDatabaseClientRecord;
}

declare module 'vona' {
  export interface IBeanRecordGlobal {
    model: BeanModel;
  }

  export interface VonaConfig {
    database: ConfigDatabase;
  }

  export interface VonaContext {
    commit(cb: FunctionAny): void;
    commitDone(): Promise<void>;
  }
}
