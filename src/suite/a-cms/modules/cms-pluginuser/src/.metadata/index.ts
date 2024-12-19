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
export class ScopeModuleCmsPluginuser extends BeanScopeBase {}

export interface ScopeModuleCmsPluginuser {
  _bean: TypeModuleBean;
  util: BeanScopeUtil;
  config: TypeModuleConfig<typeof config>;
  locale: TypeModuleLocales<(typeof locales)[TypeLocaleBase]>;
}

import 'vona';
declare module 'vona' {
  export interface IBeanScopeRecord {
    'cms-pluginuser': ScopeModuleCmsPluginuser;
  }

  export interface IBeanScopeContainer {
    cmsPluginuser: ScopeModuleCmsPluginuser;
  }

  export interface IBeanScopeConfig {
    'cms-pluginuser': ReturnType<typeof config>;
  }

  export interface IBeanScopeLocale {
    'cms-pluginuser': (typeof locales)[TypeLocaleBase];
  }
}

export function locale<K extends keyof (typeof locales)[TypeLocaleBase]>(key: K): `cms-pluginuser:${K}` {
  return `cms-pluginuser:${key}`;
}
/** scope: end */
