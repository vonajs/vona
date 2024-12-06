/** beans: begin */
export * from '../bean/bean.fields.js';
export * from '../bean/version.manager.js';
import { BeanFields } from '../bean/bean.fields.js';
import { VersionManager } from '../bean/version.manager.js';
import 'vona';
declare module 'vona' {
  export interface IBeanRecordGlobal {
    fields: BeanFields;
  }

  export interface IBeanRecordGeneral {
    'a-fields.version.manager': VersionManager;
  }
}
/** beans: end */
/** summerCache: begin */
export * from '../bean/summerCache.fieldsRightOfAtomClass.js';
export * from '../bean/summerCache.fieldsRightOfUser.js';

import { IDecoratorSummerCacheOptions } from 'vona';
declare module 'vona' {
  export interface ISummerCacheRecord {
    'a-fields:fieldsRightOfAtomClass': IDecoratorSummerCacheOptions;
    'a-fields:fieldsRightOfUser': IDecoratorSummerCacheOptions;
  }
}
/** summerCache: end */
/** summerCaches: begin */
import { SummerCacheFieldsRightOfAtomClass } from '../bean/summerCache.fieldsRightOfAtomClass.js';
import { SummerCacheFieldsRightOfUser } from '../bean/summerCache.fieldsRightOfUser.js';
export interface IModuleSummerCache {
  fieldsRightOfAtomClass: SummerCacheFieldsRightOfAtomClass;
  fieldsRightOfUser: SummerCacheFieldsRightOfUser;
}
/** summerCaches: end */
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
/** scope: begin */
import { BeanScopeBase, Scope, TypeLocaleBase, TypeModuleResource } from 'vona';

@Scope()
export class ScopeModuleAFields extends BeanScopeBase {}

export interface ScopeModuleAFields
  extends TypeModuleResource<
    typeof config,
    never,
    (typeof locales)[TypeLocaleBase],
    never,
    never,
    never,
    never,
    IModuleSummerCache
  > {}

import 'vona';
declare module 'vona' {
  export interface IBeanScopeRecord {
    'a-fields': ScopeModuleAFields;
  }

  export interface IBeanScopeContainer {
    fields: ScopeModuleAFields;
  }

  export interface IBeanScopeConfig {
    'a-fields': ReturnType<typeof config>;
  }

  export interface IBeanScopeLocale {
    'a-fields': (typeof locales)[TypeLocaleBase];
  }
}

export function locale<K extends keyof (typeof locales)[TypeLocaleBase]>(key: K): `a-fields:${K}` {
  return `a-fields:${key}`;
}
/** scope: end */
