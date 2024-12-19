/** locale: begin */
import locale_en_us from '../config/locale/en-us.js';
import locale_zh_cn from '../config/locale/zh-cn.js';
export const locales = {
  'en-us': locale_en_us,
  'zh-cn': locale_zh_cn,
};
/** locale: end */
/** scope: begin */
import { BeanScopeBase, TypeModuleBean, BeanScopeUtil, TypeModuleLocales, TypeLocaleBase } from 'vona';
import { Scope } from 'vona-module-a-bean';

@Scope()
export class ScopeModuleAThemehyacinth extends BeanScopeBase {}

export interface ScopeModuleAThemehyacinth {
  _bean: TypeModuleBean;
  util: BeanScopeUtil;
  locale: TypeModuleLocales<(typeof locales)[TypeLocaleBase]>;
}

import 'vona';
declare module 'vona' {
  export interface IBeanScopeRecord {
    'a-themehyacinth': ScopeModuleAThemehyacinth;
  }

  export interface IBeanScopeContainer {
    themehyacinth: ScopeModuleAThemehyacinth;
  }

  export interface IBeanScopeLocale {
    'a-themehyacinth': (typeof locales)[TypeLocaleBase];
  }
}

export function locale<K extends keyof (typeof locales)[TypeLocaleBase]>(key: K): `a-themehyacinth:${K}` {
  return `a-themehyacinth:${key}`;
}
/** scope: end */
