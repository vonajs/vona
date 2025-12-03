/* eslint-disable */
/** locale: begin */
import locale_en_us from '../config/locale/en-us.ts';
import locale_zh_cn from '../config/locale/zh-cn.ts';
export const locales = {
  'en-us': locale_en_us,
'zh-cn': locale_zh_cn,
};
/** locale: end */
/** scope: begin */
import { BeanScopeBase, type BeanScopeUtil, type TypeModuleLocales, type TypeLocaleBase } from 'vona';
import { Scope } from 'vona-module-a-bean';

@Scope()
export class ScopeModuleAOpenapiutils extends BeanScopeBase {}

export interface ScopeModuleAOpenapiutils {
  util: BeanScopeUtil;
locale: TypeModuleLocales<(typeof locales)[TypeLocaleBase]>;
}

import 'vona';
declare module 'vona' {
  export interface IBeanScopeRecord {
    'a-openapiutils': ScopeModuleAOpenapiutils;
  }

  export interface IBeanScopeContainer {
    openapiutils: ScopeModuleAOpenapiutils;
  }
  
  

  export interface IBeanScopeLocale {
    'a-openapiutils': (typeof locales)[TypeLocaleBase];
  }

  
}

export function $locale<K extends keyof (typeof locales)[TypeLocaleBase]>(key: K): `a-openapiutils::${K}` {
  return `a-openapiutils::${key}`;
}
/** scope: end */
