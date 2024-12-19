/** beans: begin */
export * from '../bean/version.manager.js';
import { VersionManager } from '../bean/version.manager.js';
import 'vona';
declare module 'vona' {
  export interface IBeanRecordGlobal {}

  export interface IBeanRecordGeneral {
    'a-fields.version.manager': VersionManager;
  }
}
declare module 'vona-module-a-fields' {
  export interface VersionManager {
    /** @internal */
    get scope(): ScopeModuleAFields;
  }
}
/** beans: end */
/** summerCache: begin */
export * from '../bean/summerCache.fieldsRightOfAtomClass.js';
export * from '../bean/summerCache.fieldsRightOfUser.js';

import { IDecoratorSummerCacheOptions } from 'vona-module-a-summer';
declare module 'vona-module-a-summer' {
  export interface ISummerCacheRecord {
    'a-fields:fieldsRightOfAtomClass': IDecoratorSummerCacheOptions;
    'a-fields:fieldsRightOfUser': IDecoratorSummerCacheOptions;
  }
}
declare module 'vona-module-a-fields' {
  export interface SummerCacheFieldsRightOfAtomClass {
    /** @internal */
    get scope(): ScopeModuleAFields;
  }

  export interface SummerCacheFieldsRightOfUser {
    /** @internal */
    get scope(): ScopeModuleAFields;
  }
}
/** summerCache: end */
/** summerCache: begin */
import { SummerCacheFieldsRightOfAtomClass } from '../bean/summerCache.fieldsRightOfAtomClass.js';
import { SummerCacheFieldsRightOfUser } from '../bean/summerCache.fieldsRightOfUser.js';
export interface IModuleSummerCache {
  fieldsRightOfAtomClass: SummerCacheFieldsRightOfAtomClass;
  fieldsRightOfUser: SummerCacheFieldsRightOfUser;
}
/** summerCache: end */
/** bean: begin */
export * from '../bean/bean.fields.js';

import 'vona';
declare module 'vona' {}
declare module 'vona-module-a-fields' {
  export interface BeanFields {
    /** @internal */
    get scope(): ScopeModuleAFields;
  }
}
/** bean: end */
/** bean: begin */
import { BeanFields } from '../bean/bean.fields.js';
import 'vona';
declare module 'vona' {
  export interface IBeanRecordGlobal {
    fields: BeanFields;
  }
}
/** bean: end */
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
import {
  BeanScopeBase,
  TypeModuleBean,
  BeanScopeUtil,
  TypeModuleConfig,
  TypeModuleLocales,
  TypeLocaleBase,
} from 'vona';
import { Scope } from 'vona-module-a-bean';

@Scope()
export class ScopeModuleAFields extends BeanScopeBase {}

export interface ScopeModuleAFields {
  _bean: TypeModuleBean;
  util: BeanScopeUtil;
  config: TypeModuleConfig<typeof config>;
  locale: TypeModuleLocales<(typeof locales)[TypeLocaleBase]>;
  summerCache: IModuleSummerCache;
}

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
