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
/** beans: end */
/** atoms: begin */
export * from '../atom/document.js';
/** atoms: end */
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
  Scope,
  TypeModuleBean,
  BeanScopeUtil,
  TypeModuleConfig,
  TypeModuleLocales,
  TypeLocaleBase,
} from 'vona';

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
