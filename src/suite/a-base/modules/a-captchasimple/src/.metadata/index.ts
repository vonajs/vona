/** beans: begin */
export * from '../bean/captcha.provider.captcha.js';

import 'vona';
declare module 'vona' {
  export interface IBeanRecordGlobal {}
}
/** beans: end */
/** controllers: begin */
export * from '../controller/captcha.js';
/** controllers: end */
/** locale: begin */
import locale_en_us from '../config/locale/en-us.js';
import locale_zh_cn from '../config/locale/zh-cn.js';
export const locales = {
  'en-us': locale_en_us,
  'zh-cn': locale_zh_cn,
};
/** locale: end */
/** error: begin */
export * from '../config/errors.js';
import { Errors } from '../config/errors.js';
/** error: end */
/** scope: begin */
import { BeanScopeBase, Scope, TypeLocaleBase, TypeModuleResource } from 'vona';

@Scope()
export class ScopeModuleACaptchasimple extends BeanScopeBase {}

export interface ScopeModuleACaptchasimple
  extends TypeModuleResource<never, typeof Errors, (typeof locales)[TypeLocaleBase], never, never, never> {}

import 'vona';
declare module 'vona' {
  export interface IBeanScopeRecord {
    'a-captchasimple': ScopeModuleACaptchasimple;
  }

  export interface IBeanScopeContainer {
    captchasimple: ScopeModuleACaptchasimple;
  }

  export interface IBeanScopeLocale {
    'a-captchasimple': (typeof locales)[TypeLocaleBase];
  }
}
/** scope: end */
