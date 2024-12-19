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
export class ScopeModuleCmsThemedocs extends BeanScopeBase {}

export interface ScopeModuleCmsThemedocs {
  _bean: TypeModuleBean;
  util: BeanScopeUtil;
  config: TypeModuleConfig<typeof config>;
  locale: TypeModuleLocales<(typeof locales)[TypeLocaleBase]>;
}

import 'vona';
declare module 'vona' {
  export interface IBeanScopeRecord {
    'cms-themedocs': ScopeModuleCmsThemedocs;
  }

  export interface IBeanScopeContainer {
    cmsThemedocs: ScopeModuleCmsThemedocs;
  }

  export interface IBeanScopeConfig {
    'cms-themedocs': ReturnType<typeof config>;
  }

  export interface IBeanScopeLocale {
    'cms-themedocs': (typeof locales)[TypeLocaleBase];
  }
}

export function locale<K extends keyof (typeof locales)[TypeLocaleBase]>(key: K): `cms-themedocs:${K}` {
  return `cms-themedocs:${key}`;
}
/** scope: end */
