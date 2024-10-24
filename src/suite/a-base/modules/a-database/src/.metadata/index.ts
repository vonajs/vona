/** beans: begin */
export * from '../bean/bean.database.js';
export * from '../bean/bean.databaseClient.js';
export * from '../bean/bean.model.js';
export * from '../bean/database.dialect.mysql.js';
export * from '../bean/database.dialect.mysql2.js';
export * from '../bean/database.dialect.pg.js';
export * from '../bean/virtual.databaseDialect.js';
import { BeanDatabase } from '../bean/bean.database.js';
import { BeanDatabaseClient } from '../bean/bean.databaseClient.js';
import { BeanModel } from '../bean/bean.model.js';
import 'vona';
declare module 'vona' {
  export interface IBeanRecord {
    database: BeanDatabase;
    databaseClient: BeanDatabaseClient;
    model: BeanModel;
  }
}
/** beans: end */
/** services: begin */

export interface IModuleService {}
import 'vona';
declare module 'vona' {
  export interface IBeanRecord {}
}
/** services: end */
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
/** scope: begin */
import { BeanScopeBase, Scope, TypeLocaleBase, TypeModuleResource } from 'vona';

@Scope()
export class ScopeModuleADatabase extends BeanScopeBase {}

export interface ScopeModuleADatabase
  extends TypeModuleResource<any, typeof Errors, (typeof locales)[TypeLocaleBase], any, IModuleService, any> {}

import 'vona';
declare module 'vona' {
  export interface IBeanScopeRecord {
    'a-database': ScopeModuleADatabase;
  }

  export interface IBeanScopeLocale {
    'a-database': (typeof locales)[TypeLocaleBase];
  }
}
/** scope: end */
