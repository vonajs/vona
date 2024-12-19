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
export class ScopeModuleCmsThemeblog extends BeanScopeBase {}

export interface ScopeModuleCmsThemeblog {
  _bean: TypeModuleBean;
  util: BeanScopeUtil;
  config: TypeModuleConfig<typeof config>;
  locale: TypeModuleLocales<(typeof locales)[TypeLocaleBase]>;
}

import 'vona';
declare module 'vona' {
  export interface IBeanScopeRecord {
    'cms-themeblog': ScopeModuleCmsThemeblog;
  }

  export interface IBeanScopeContainer {
    cmsThemeblog: ScopeModuleCmsThemeblog;
  }

  export interface IBeanScopeConfig {
    'cms-themeblog': ReturnType<typeof config>;
  }

  export interface IBeanScopeLocale {
    'cms-themeblog': (typeof locales)[TypeLocaleBase];
  }
}

export function locale<K extends keyof (typeof locales)[TypeLocaleBase]>(key: K): `cms-themeblog:${K}` {
  return `cms-themeblog:${key}`;
}
/** scope: end */
