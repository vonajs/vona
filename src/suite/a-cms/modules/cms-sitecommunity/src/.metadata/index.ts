/** beans: begin */
export * from '../bean/version.manager.js';
import { VersionManager } from '../bean/version.manager.js';
import 'vona';
declare module 'vona' {
  export interface IBeanRecordGlobal {}

  export interface IBeanRecordGeneral {
    'cms-sitecommunity.version.manager': VersionManager;
  }
}
declare module 'vona-module-cms-sitecommunity' {
  export interface VersionManager {
    /** @internal */
    get scope(): ScopeModuleCmsSitecommunity;
  }
}
/** beans: end */
/** atom: begin */
export * from '../atom/post.js';

import 'vona';
declare module 'vona' {
  export interface IAtomRecord {
    'cms-sitecommunity:post': never;
  }
}
declare module 'vona-module-cms-sitecommunity' {
  export interface AtomPost {
    /** @internal */
    get scope(): ScopeModuleCmsSitecommunity;
  }
}
/** atom: end */
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
export class ScopeModuleCmsSitecommunity extends BeanScopeBase {}

export interface ScopeModuleCmsSitecommunity {
  _bean: TypeModuleBean;
  util: BeanScopeUtil;
  config: TypeModuleConfig<typeof config>;
  locale: TypeModuleLocales<(typeof locales)[TypeLocaleBase]>;
}

import 'vona';
declare module 'vona' {
  export interface IBeanScopeRecord {
    'cms-sitecommunity': ScopeModuleCmsSitecommunity;
  }

  export interface IBeanScopeContainer {
    cmsSitecommunity: ScopeModuleCmsSitecommunity;
  }

  export interface IBeanScopeConfig {
    'cms-sitecommunity': ReturnType<typeof config>;
  }

  export interface IBeanScopeLocale {
    'cms-sitecommunity': (typeof locales)[TypeLocaleBase];
  }
}

export function locale<K extends keyof (typeof locales)[TypeLocaleBase]>(key: K): `cms-sitecommunity:${K}` {
  return `cms-sitecommunity:${key}`;
}
/** scope: end */
