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
  extends TypeModuleResource<never, never, (typeof locales)[TypeLocaleBase], never, never, never> {}

import 'vona';
declare module 'vona' {
  export interface IBeanScopeRecord {
    'a-themebrilliant': ScopeModuleAThemebrilliant;
  }

  export interface IBeanScopeContainer {
    themebrilliant: ScopeModuleAThemebrilliant;
  }

  export interface IBeanScopeLocale {
    'a-themebrilliant': (typeof locales)[TypeLocaleBase];
  }
}

export function locale<K extends keyof (typeof locales)[TypeLocaleBase]>(key: K): `a-themebrilliant:${K}` {
  return `a-themebrilliant:${key}`;
}
/** scope: end */
