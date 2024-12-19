/** beans: begin */
export * from '../bean/version.manager.js';
import { VersionManager } from '../bean/version.manager.js';
import 'vona';
declare module 'vona' {
  export interface IBeanRecordGlobal {}

  export interface IBeanRecordGeneral {
    'cms-sitedocumentation.version.manager': VersionManager;
  }
}
declare module 'vona-module-cms-sitedocumentation' {
  export interface VersionManager {
    /** @internal */
    get scope(): ScopeModuleCmsSitedocumentation;
  }
}
/** beans: end */
/** atom: begin */
export * from '../atom/document.js';

import 'vona';
declare module 'vona' {
  export interface IAtomRecord {
    'cms-sitedocumentation:document': never;
  }
}
declare module 'vona-module-cms-sitedocumentation' {
  export interface AtomDocument {
    /** @internal */
    get scope(): ScopeModuleCmsSitedocumentation;
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
export class ScopeModuleCmsSitedocumentation extends BeanScopeBase {}

export interface ScopeModuleCmsSitedocumentation {
  _bean: TypeModuleBean;
  util: BeanScopeUtil;
  config: TypeModuleConfig<typeof config>;
  locale: TypeModuleLocales<(typeof locales)[TypeLocaleBase]>;
}

import 'vona';
declare module 'vona' {
  export interface IBeanScopeRecord {
    'cms-sitedocumentation': ScopeModuleCmsSitedocumentation;
  }

  export interface IBeanScopeContainer {
    cmsSitedocumentation: ScopeModuleCmsSitedocumentation;
  }

  export interface IBeanScopeConfig {
    'cms-sitedocumentation': ReturnType<typeof config>;
  }

  export interface IBeanScopeLocale {
    'cms-sitedocumentation': (typeof locales)[TypeLocaleBase];
  }
}

export function locale<K extends keyof (typeof locales)[TypeLocaleBase]>(key: K): `cms-sitedocumentation:${K}` {
  return `cms-sitedocumentation:${key}`;
}
/** scope: end */
