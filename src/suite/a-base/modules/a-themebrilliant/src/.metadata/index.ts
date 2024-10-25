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
export class ScopeModuleAThemebrilliant extends BeanScopeBase {}

export interface ScopeModuleAThemebrilliant
  extends TypeModuleResource<any, any, (typeof locales)[TypeLocaleBase], any, any, any> {}

import 'vona';
declare module 'vona' {
  export interface IBeanScopeRecord {
    'a-themebrilliant': ScopeModuleAThemebrilliant;
  }

  export interface BeanBase {
    $scopeThemebrilliant: ScopeModuleAThemebrilliant;
  }

  export interface IBeanScopeLocale {
    'a-themebrilliant': (typeof locales)[TypeLocaleBase];
  }
}
/** scope: end */
