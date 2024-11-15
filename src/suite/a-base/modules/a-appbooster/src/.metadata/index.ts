/** beans: begin */
export * from '../bean/version.manager.js';

import 'vona';
declare module 'vona' {
  export interface IBeanRecordGlobal {}
}
/** beans: end */
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
export class ScopeModuleAAppbooster extends BeanScopeBase {}

export interface ScopeModuleAAppbooster
  extends TypeModuleResource<never, never, (typeof locales)[TypeLocaleBase], never, never, never> {}

import 'vona';
declare module 'vona' {
  export interface IBeanScopeRecord {
    'a-appbooster': ScopeModuleAAppbooster;
  }

  export interface IBeanScopeContainer {
    appbooster: ScopeModuleAAppbooster;
  }

  export interface IBeanScopeLocale {
    'a-appbooster': (typeof locales)[TypeLocaleBase];
  }
}
/** scope: end */
