/** beans: begin */
export * from '../bean/bean.database.js';
export * from '../bean/bean.databaseDialectBase_.js';
export * from '../bean/bean.modelBase_.js';
export * from '../bean/bean.model_.js';
export * from '../bean/database.dialect.mysql.js';
export * from '../bean/database.dialect.mysql2.js';
export * from '../bean/database.dialect.pg.js';
import { BeanDatabase } from '../bean/bean.database.js';
import { BeanDatabaseDialectBase } from '../bean/bean.databaseDialectBase_.js';
import { BeanModelBase } from '../bean/bean.modelBase_.js';
import { BeanModel } from '../bean/bean.model_.js';
import { DatabaseDialectMysql } from '../bean/database.dialect.mysql.js';
import { DatabaseDialectMysql2 } from '../bean/database.dialect.mysql2.js';
import { DatabaseDialectPg } from '../bean/database.dialect.pg.js';
import 'vona';
declare module 'vona' {
  export interface IBeanRecordGlobal {
    database: BeanDatabase;
  }

  export interface IBeanRecordGeneral {
    databaseDialectBase: BeanDatabaseDialectBase;
    modelBase: BeanModelBase;
    model: BeanModel;
    'a-database.database.dialect.mysql': DatabaseDialectMysql;
    'a-database.database.dialect.mysql2': DatabaseDialectMysql2;
    'a-database.database.dialect.pg': DatabaseDialectPg;
  }
}
declare module 'vona-module-a-database' {
  export interface BeanDatabase {
    /** @internal */
    get scope(): ScopeModuleADatabase;
  }

  export interface DatabaseDialectMysql {
    /** @internal */
    get scope(): ScopeModuleADatabase;
  }

  export interface DatabaseDialectMysql2 {
    /** @internal */
    get scope(): ScopeModuleADatabase;
  }

  export interface DatabaseDialectPg {
    /** @internal */
    get scope(): ScopeModuleADatabase;
  }
}
/** beans: end */
/** middleware: begin */
export * from '../bean/middleware.transaction.js';
import { IMiddlewareOptionsTransaction } from '../bean/middleware.transaction.js';
import 'vona';
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
/** middleware: end */
/** service: begin */
export * from '../service/databaseClient.js';
export * from '../service/dbMeta.js';
export * from '../service/transaction.js';

import 'vona';
declare module 'vona' {
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
/** service: end */
/** service: begin */
import { ServiceDatabaseClient } from '../service/databaseClient.js';
import { ServiceDbMeta } from '../service/dbMeta.js';
import { ServiceTransaction } from '../service/transaction.js';
export interface IModuleService {
  databaseClient: ServiceDatabaseClient;
  dbMeta: ServiceDbMeta;
  transaction: ServiceTransaction;
}
/** service: end */
/** service: begin */
import 'vona';
declare module 'vona' {
  export interface IBeanRecordGeneral {
    'a-database.service.databaseClient': ServiceDatabaseClient;
    'a-database.service.dbMeta': ServiceDbMeta;
    'a-database.service.transaction': ServiceTransaction;
  }
}
/** service: end */
/** config: begin */
export * from '../config/config.js';
import { config } from '../config/config.js';
/** config: end */
/** locale: begin */
import locale_en_us from '../config/locale/en-us.js';
import locale_zh_cn from '../config/locale/zh-cn.js';
export const locales = {
  'en-us': locale_en_us,
  'zh-cn': locale_zh_cn,
};
/** locale: end */
/** error: begin */
export * from '../config/errors.js';
import { Errors } from '../config/errors.js';
/** error: end */
/** monkey: begin */
export * from '../monkey.js';
/** monkey: end */
/** main: begin */
export * from '../main.js';
/** main: end */
/** scope: begin */
import {
  BeanScopeBase,
  Scope,
  TypeModuleBean,
  BeanScopeUtil,
  TypeModuleConfig,
  TypeModuleErrors,
  TypeModuleLocales,
  TypeLocaleBase,
} from 'vona';

@Scope()
export class ScopeModuleADatabase extends BeanScopeBase {}

export interface ScopeModuleADatabase {
  _bean: TypeModuleBean;
  util: BeanScopeUtil;
  config: TypeModuleConfig<typeof config>;
  error: TypeModuleErrors<typeof Errors>;
  locale: TypeModuleLocales<(typeof locales)[TypeLocaleBase]>;
  service: IModuleService;
}

import 'vona';
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

export function locale<K extends keyof (typeof locales)[TypeLocaleBase]>(key: K): `a-database:${K}` {
  return `a-database:${key}`;
}
/** scope: end */
