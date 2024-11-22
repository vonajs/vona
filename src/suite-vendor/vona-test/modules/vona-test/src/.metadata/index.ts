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
export class ScopeModuleVonaTest extends BeanScopeBase {}

export interface ScopeModuleVonaTest
  extends TypeModuleResource<never, never, (typeof locales)[TypeLocaleBase], never, never, never> {}

import 'vona';
declare module 'vona' {
  export interface IBeanScopeRecord {
    'vona-test': ScopeModuleVonaTest;
  }

  export interface IBeanScopeContainer {
    vonaTest: ScopeModuleVonaTest;
  }

  export interface IBeanScopeLocale {
    'vona-test': (typeof locales)[TypeLocaleBase];
  }
}

export function locale<K extends keyof (typeof locales)[TypeLocaleBase]>(key: K): K {
  return key;
}
/** scope: end */
