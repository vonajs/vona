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
export class ScopeModuleABasefront extends BeanScopeBase {}

export interface ScopeModuleABasefront
  extends TypeModuleResource<any, any, (typeof locales)[TypeLocaleBase], any, any, any> {}

import 'vona';
declare module 'vona' {
  export interface IBeanScopeRecord {
    'a-basefront': ScopeModuleABasefront;
  }

  export interface BeanScopeContainer {
    basefront: ScopeModuleABasefront;
  }

  export interface IBeanScopeLocale {
    'a-basefront': (typeof locales)[TypeLocaleBase];
  }
}
/** scope: end */
