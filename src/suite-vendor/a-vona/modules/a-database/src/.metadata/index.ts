import type { BeanScopeUtil, TypeLocaleBase, TypeModuleConfig, TypeModuleErrors, TypeModuleLocales } from 'vona';
import type { IDecoratorBroadcastOptions } from 'vona-module-a-broadcast';

import type { EventOn } from 'vona-module-a-event';
/** aopMethod: begin */
import type { IAopMethodOptionsTransaction } from '../bean/aopMethod.transaction.ts';
/** bean: end */
/** bean: begin */
import type { BeanDatabase } from '../bean/bean.database.ts';

/** broadcast: end */
/** broadcast: begin */
import type { BroadcastColumnsClear } from '../bean/broadcast.columnsClear.ts';
import type { BroadcastDatabaseClientReload } from '../bean/broadcast.databaseClientReload.ts';
/** event: end */
/** event: begin */
import type { EventClientNameReal } from '../bean/event.clientNameReal.ts';

/** event: end */
/** event: begin */
import type { TypeEventClientNameRealData, TypeEventClientNameRealResult } from '../bean/event.clientNameReal.ts';
import type { EventColumnsClear } from '../bean/event.columnsClear.ts';
import type { TypeEventColumnsClearData, TypeEventColumnsClearResult } from '../bean/event.columnsClear.ts';
import type { EventDatabaseClientReload } from '../bean/event.databaseClientReload.ts';
import type { TypeEventDatabaseClientReloadData, TypeEventDatabaseClientReloadResult } from '../bean/event.databaseClientReload.ts';
import type { config } from '../config/config.ts';
import type { Errors } from '../config/errors.ts';
/** service: end */
/** service: begin */
import type { ServiceColumns } from '../service/columns.ts';

import type { ServiceColumnsCache } from '../service/columnsCache.ts';
import type { ServiceDatabase } from '../service/database.ts';
import type { ServiceDatabaseAsyncLocalStorage } from '../service/databaseAsyncLocalStorage.ts';
import type { ServiceDatabaseClient } from '../service/databaseClient.ts';
import type { ServiceDbMeta } from '../service/dbMeta.ts';
import type { ServiceModelResolver } from '../service/modelResolver.ts';
import type { ServiceTransaction } from '../service/transaction.ts';
import type { ServiceTransactionConsistency‌ } from '../service/transactionConsistency‌.ts';
/** main: end */
/** scope: begin */
import { BeanScopeBase } from 'vona';
import { Scope } from 'vona-module-a-bean';
/** config: end */
/** locale: begin */
import locale_en_us from '../config/locale/en-us.ts';
/** service: end */
/** service: begin */

import locale_zh_cn from '../config/locale/zh-cn.ts';
import 'vona';
import 'vona';
import 'vona';
import 'vona';
import 'vona';
import 'vona';

import 'vona';

export * from '../bean/aopMethod.transaction.ts';
declare module 'vona-module-a-aspect' {

  export interface IAopMethodRecord {
    'a-database:transaction': IAopMethodOptionsTransaction;
  }

}
declare module 'vona-module-a-database' {

  export interface AopMethodTransaction {
    /** @internal */
    get scope(): ScopeModuleADatabase;
  }
}
/** aopMethod: end */
/** bean: begin */
export * from '../bean/bean.database.ts';
export * from '../bean/bean.databaseDialectBase.ts';
export * from '../bean/bean.model.ts';
export * from '../bean/bean.modelBase.ts';
declare module 'vona' {

}
declare module 'vona-module-a-database' {

  export interface BeanDatabase {
    /** @internal */
    get scope(): ScopeModuleADatabase;
  }
}
declare module 'vona' {
  export interface IBeanRecordGlobal {
    database: BeanDatabase;
  }
}
/** bean: end */
/** broadcast: begin */
export * from '../bean/broadcast.columnsClear.ts';
export * from '../bean/broadcast.databaseClientReload.ts';
declare module 'vona-module-a-broadcast' {

  export interface IBroadcastRecord {
    'a-database:columnsClear': IDecoratorBroadcastOptions;
    'a-database:databaseClientReload': IDecoratorBroadcastOptions;
  }

}
declare module 'vona-module-a-database' {

  export interface BroadcastColumnsClear {
    /** @internal */
    get scope(): ScopeModuleADatabase;
  }

  export interface BroadcastDatabaseClientReload {
    /** @internal */
    get scope(): ScopeModuleADatabase;
  }
}
export interface IModuleBroadcast {
  columnsClear: BroadcastColumnsClear;
  databaseClientReload: BroadcastDatabaseClientReload;
}
/** broadcast: end */
/** event: begin */
export * from '../bean/event.clientNameReal.ts';
export * from '../bean/event.columnsClear.ts';
export * from '../bean/event.databaseClientReload.ts';
declare module 'vona' {

}
declare module 'vona-module-a-database' {

  export interface EventClientNameReal {
    /** @internal */
    get scope(): ScopeModuleADatabase;
  }

  export interface EventColumnsClear {
    /** @internal */
    get scope(): ScopeModuleADatabase;
  }

  export interface EventDatabaseClientReload {
    /** @internal */
    get scope(): ScopeModuleADatabase;
  }
}
export interface IModuleEvent {
  clientNameReal: EventClientNameReal;
  columnsClear: EventColumnsClear;
  databaseClientReload: EventDatabaseClientReload;
}
declare module 'vona-module-a-event' {
  export interface IEventRecord {
    'a-database:clientNameReal': EventOn<TypeEventClientNameRealData, TypeEventClientNameRealResult>;
    'a-database:columnsClear': EventOn<TypeEventColumnsClearData, TypeEventColumnsClearResult>;
    'a-database:databaseClientReload': EventOn<TypeEventDatabaseClientReloadData, TypeEventDatabaseClientReloadResult>;
  }
}
/** service: end */
/** config: begin */
export * from '../config/config.ts';
/** locale: end */
/** error: begin */
export * from '../config/errors.ts';
/** error: end */
/** main: begin */
export * from '../main.ts';
/** event: end */
/** service: begin */
export * from '../service/columns.ts';
export * from '../service/columnsCache.ts';
export * from '../service/database.ts';
export * from '../service/databaseAsyncLocalStorage.ts';
export * from '../service/databaseClient.ts';
export * from '../service/dbMeta.ts';
declare module 'vona-module-a-web' {

  export interface IServiceRecord {
    'a-database:columns': never;
    'a-database:columnsCache': never;
    'a-database:database': never;
    'a-database:databaseAsyncLocalStorage': never;
    'a-database:databaseClient': never;
    'a-database:dbMeta': never;
    'a-database:modelResolver': never;
    'a-database:transaction': never;
    'a-database:transactionConsistency‌': never;
  }

}
declare module 'vona-module-a-database' {

  export interface ServiceColumns {
    /** @internal */
    get scope(): ScopeModuleADatabase;
  }

  export interface ServiceColumnsCache {
    /** @internal */
    get scope(): ScopeModuleADatabase;
  }

  export interface ServiceDatabase {
    /** @internal */
    get scope(): ScopeModuleADatabase;
  }

  export interface ServiceDatabaseAsyncLocalStorage {
    /** @internal */
    get scope(): ScopeModuleADatabase;
  }

  export interface ServiceDatabaseClient {
    /** @internal */
    get scope(): ScopeModuleADatabase;
  }

  export interface ServiceDbMeta {
    /** @internal */
    get scope(): ScopeModuleADatabase;
  }

  export interface ServiceModelResolver {
    /** @internal */
    get scope(): ScopeModuleADatabase;
  }

  export interface ServiceTransaction {
    /** @internal */
    get scope(): ScopeModuleADatabase;
  }

  export interface ServiceTransactionConsistency‌ {
    /** @internal */
    get scope(): ScopeModuleADatabase;
  }
}
export interface IModuleService {
  columns: ServiceColumns;
  columnsCache: ServiceColumnsCache;
  database: ServiceDatabase;
  databaseAsyncLocalStorage: ServiceDatabaseAsyncLocalStorage;
  databaseClient: ServiceDatabaseClient;
  dbMeta: ServiceDbMeta;
  modelResolver: ServiceModelResolver;
  transaction: ServiceTransaction;
  transactionConsistency‌: ServiceTransactionConsistency‌;
}
declare module 'vona' {
  export interface IBeanRecordGeneral {
    'a-database.service.columns': ServiceColumns;
    'a-database.service.columnsCache': ServiceColumnsCache;
    'a-database.service.database': ServiceDatabase;
    'a-database.service.databaseAsyncLocalStorage': ServiceDatabaseAsyncLocalStorage;
    'a-database.service.databaseClient': ServiceDatabaseClient;
    'a-database.service.dbMeta': ServiceDbMeta;
    'a-database.service.modelResolver': ServiceModelResolver;
    'a-database.service.transaction': ServiceTransaction;
    'a-database.service.transactionConsistency‌': ServiceTransactionConsistency‌;
  }
}
export * from '../service/modelResolver.ts';
export const locales = {
  'en-us': locale_en_us,
  'zh-cn': locale_zh_cn,
};
export * from '../service/transaction.ts';
export * from '../service/transactionConsistency‌.ts';

@Scope()
export class ScopeModuleADatabase extends BeanScopeBase {}

export interface ScopeModuleADatabase {
  util: BeanScopeUtil;
  config: TypeModuleConfig<typeof config>;
  error: TypeModuleErrors<typeof Errors>;
  locale: TypeModuleLocales<(typeof locales)[TypeLocaleBase]>;
  broadcast: IModuleBroadcast;
  event: IModuleEvent;
  service: IModuleService;
}
declare module 'vona' {
  export interface IBeanScopeRecord {
    'a-database': ScopeModuleADatabase;
  }

  export interface IBeanScopeContainer {
    database: ScopeModuleADatabase;
  }

  export interface IBeanScopeConfig {
    'a-database': ReturnType<typeof config>;
  }

  export interface IBeanScopeLocale {
    'a-database': (typeof locales)[TypeLocaleBase];
  }
}

export function $locale<K extends keyof (typeof locales)[TypeLocaleBase]>(key: K): `a-database::${K}` {
  return `a-database::${key}`;
}
/** scope: end */
