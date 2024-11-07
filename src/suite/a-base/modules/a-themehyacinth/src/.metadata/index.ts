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
export class ScopeModuleAThemehyacinth extends BeanScopeBase {}

export interface ScopeModuleAThemehyacinth
  extends TypeModuleResource<any, any, (typeof locales)[TypeLocaleBase], any, any, any> {}

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
/** scope: end */
