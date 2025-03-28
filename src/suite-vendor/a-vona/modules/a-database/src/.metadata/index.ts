import type { BeanScopeUtil, TypeLocaleBase, TypeModuleConfig, TypeModuleErrors, TypeModuleLocales } from 'vona';
/** aopMethod: begin */
import type { IAopMethodOptionsTransaction } from '../bean/aopMethod.transaction.ts';

/** bean: end */
/** bean: begin */
import type { BeanDatabase } from '../bean/bean.database.ts';
/** event: end */
/** event: begin */
import type { EventModelCacheName } from '../bean/event.modelCacheName.ts';
/** event: end */
/** event: begin */
import type { TypeEventModelCacheNameData, TypeEventModelCacheNameResult } from '../bean/event.modelCacheName.ts';

import type { config } from '../config/config.ts';
import type { Errors } from '../config/errors.ts';
/** service: end */
/** service: begin */
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
import locale_zh_cn from '../config/locale/zh-cn.ts';
/** service: end */
/** service: begin */

import 'vona';
import 'vona';
import 'vona';
import 'vona';
import 'vona-module-a-event';
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
/** event: begin */
export * from '../bean/event.modelCacheName.ts';
declare module 'vona' {

}
declare module 'vona-module-a-database' {

  export interface EventModelCacheName {
    /** @internal */
    get scope(): ScopeModuleADatabase;
  }
}
export interface IModuleEvent {
  modelCacheName: EventModelCacheName;
}
declare module 'vona-module-a-event' {
  export interface IEventRecord {
    'a-database:modelCacheName': (data: TypeEventModelCacheNameData) => Promise<TypeEventModelCacheNameResult> | TypeEventModelCacheNameResult;
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
export * from '../service/databaseClient.ts';
export * from '../service/dbMeta.ts';
declare module 'vona-module-a-web' {

  export interface IServiceRecord {
    'a-database:databaseClient': never;
    'a-database:dbMeta': never;
    'a-database:modelResolver': never;
    'a-database:transaction': never;
    'a-database:transactionConsistency‌': never;
  }

}
declare module 'vona-module-a-database' {

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
  databaseClient: ServiceDatabaseClient;
  dbMeta: ServiceDbMeta;
  modelResolver: ServiceModelResolver;
  transaction: ServiceTransaction;
  transactionConsistency‌: ServiceTransactionConsistency‌;
}
declare module 'vona' {
  export interface IBeanRecordGeneral {
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
