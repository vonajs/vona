import type { BeanScopeUtil, TypeLocaleBase, TypeModuleConfig, TypeModuleErrors, TypeModuleLocales } from 'vona';
import type { IAopMethodOptionsTransaction } from '../bean/aopMethod.transaction.ts';
/** bean: end */
/** bean: begin */
import type { BeanDatabase } from '../bean/bean.database.ts';
/** middleware: end */
/** aopMethod: begin */
import type { IMiddlewareOptionsTransaction } from '../bean/middleware.transaction.ts';

import type { config } from '../config/config.ts';
import type { Errors } from '../config/errors.ts';
/** service: end */
/** service: begin */
import type { ServiceDatabaseClient } from '../service/databaseClient.ts';

import type { ServiceDbMeta } from '../service/dbMeta.ts';
import type { ServiceTransaction } from '../service/transaction.ts';
/** main: end */
/** scope: begin */
import { BeanScopeBase } from 'vona';
import { Scope } from 'vona-module-a-bean';
/** service: end */
/** service: begin */

/** config: end */
/** locale: begin */
import locale_en_us from '../config/locale/en-us.ts';
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

  export interface IMiddlewareRecordLocal {
    'a-database:transaction': IMiddlewareOptionsTransaction;
  }

}
declare module 'vona-module-a-database' {

  export interface MiddlewareTransaction {
    /** @internal */
    get scope(): ScopeModuleADatabase;
  }
}
/** aopMethod: end */
/** bean: begin */
export * from '../bean/bean.database.ts';
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
export * from '../bean/bean.databaseDialectBase.ts';
export * from '../bean/bean.model.ts';
export * from '../bean/bean.modelBase.ts';
/** middleware: begin */
export * from '../bean/middleware.transaction.ts';
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
/** service: end */
/** config: begin */
export * from '../config/config.ts';
/** locale: end */
/** error: begin */
export * from '../config/errors.ts';
/** error: end */
/** main: begin */
export * from '../main.ts';
declare module 'vona-module-a-web' {

  export interface IServiceRecord {
    'a-database:databaseClient': never;
    'a-database:dbMeta': never;
    'a-database:transaction': never;
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

  export interface ServiceTransaction {
    /** @internal */
    get scope(): ScopeModuleADatabase;
  }
}
export interface IModuleService {
  databaseClient: ServiceDatabaseClient;
  dbMeta: ServiceDbMeta;
  transaction: ServiceTransaction;
}
declare module 'vona' {
  export interface IBeanRecordGeneral {
    'a-database.service.databaseClient': ServiceDatabaseClient;
    'a-database.service.dbMeta': ServiceDbMeta;
    'a-database.service.transaction': ServiceTransaction;
  }
}
/** bean: end */
/** service: begin */
export * from '../service/databaseClient.ts';
export const locales = {
  'en-us': locale_en_us,
  'zh-cn': locale_zh_cn,
};
export * from '../service/dbMeta.ts';
export * from '../service/transaction.ts';

@Scope()
export class ScopeModuleADatabase extends BeanScopeBase {}

export interface ScopeModuleADatabase {
  util: BeanScopeUtil;
  config: TypeModuleConfig<typeof config>;
  error: TypeModuleErrors<typeof Errors>;
  locale: TypeModuleLocales<(typeof locales)[TypeLocaleBase]>;
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
