/** beans: begin */
export * from '../bean/bean.fields.js';
export * from '../bean/summer.cache.fieldsRightOfAtomClass.js';
export * from '../bean/summer.cache.fieldsRightOfUser.js';
export * from '../bean/version.manager.js';
import { BeanFields } from '../bean/bean.fields.js';
import 'vona';
declare module 'vona' {
  export interface IBeanRecord {
    fields: BeanFields;
  }
}
/** beans: end */
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
import { BeanScopeBase, Scope, TypeLocaleBase, TypeModuleResource } from 'vona';

@Scope()
export class ScopeModuleAFields extends BeanScopeBase {}

export interface ScopeModuleAFields
  extends TypeModuleResource<typeof config, any, (typeof locales)[TypeLocaleBase], any, any, any> {}

import 'vona';
declare module 'vona' {
  export interface IBeanScopeRecord {
    'a-fields': ScopeModuleAFields;
  }

  export interface IBeanScopeConfig {
    'a-fields': ReturnType<typeof config>;
  }

  export interface IBeanScopeLocale {
    'a-fields': (typeof locales)[TypeLocaleBase];
  }
}
/** scope: end */
