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
import { BeanScopeBase, Scope, TypeLocaleBase, TypeModuleResource } from 'vona';

@Scope()
export class ScopeModuleCmsSitedocumentation extends BeanScopeBase {}

export interface ScopeModuleCmsSitedocumentation
  extends TypeModuleResource<typeof config, any, (typeof locales)[TypeLocaleBase], any, any, any> {}

import 'vona';
declare module 'vona' {
  export interface IBeanScopeRecord {
    'cms-sitedocumentation': ScopeModuleCmsSitedocumentation;
  }

  export interface BeanScopeContainer {
    cmsSitedocumentation: ScopeModuleCmsSitedocumentation;
  }

  export interface IBeanScopeConfig {
    'cms-sitedocumentation': ReturnType<typeof config>;
  }

  export interface IBeanScopeLocale {
    'cms-sitedocumentation': (typeof locales)[TypeLocaleBase];
  }
}
/** scope: end */
