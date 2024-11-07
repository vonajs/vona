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
export class ScopeModuleCmsPluginuser extends BeanScopeBase {}

export interface ScopeModuleCmsPluginuser
  extends TypeModuleResource<typeof config, any, (typeof locales)[TypeLocaleBase], any, any, any> {}

import 'vona';
declare module 'vona' {
  export interface IBeanScopeRecord {
    'cms-pluginuser': ScopeModuleCmsPluginuser;
  }

  export interface BeanScopeContainer {
    cmsPluginuser: ScopeModuleCmsPluginuser;
  }

  export interface IBeanScopeConfig {
    'cms-pluginuser': ReturnType<typeof config>;
  }

  export interface IBeanScopeLocale {
    'cms-pluginuser': (typeof locales)[TypeLocaleBase];
  }
}
/** scope: end */
