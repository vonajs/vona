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
export class ScopeModuleALayoutmobile extends BeanScopeBase {}

export interface ScopeModuleALayoutmobile {
  _bean: TypeModuleBean;
  util: BeanScopeUtil;
  locale: TypeModuleLocales<(typeof locales)[TypeLocaleBase]>;
}

import 'vona';
declare module 'vona' {
  export interface IBeanScopeRecord {
    'a-layoutmobile': ScopeModuleALayoutmobile;
  }

  export interface IBeanScopeContainer {
    layoutmobile: ScopeModuleALayoutmobile;
  }

  export interface IBeanScopeLocale {
    'a-layoutmobile': (typeof locales)[TypeLocaleBase];
  }
}

export function locale<K extends keyof (typeof locales)[TypeLocaleBase]>(key: K): `a-layoutmobile:${K}` {
  return `a-layoutmobile:${key}`;
}
/** scope: end */
