/** beans: begin */
export * from '../bean/bean.captcha.js';
import { BeanCaptcha } from '../bean/bean.captcha.js';
import 'vona';
declare module 'vona' {
  export interface IBeanRecordGlobal {
    captcha: BeanCaptcha;
  }

  export interface IBeanRecordGeneral {}
}
/** beans: end */
/** middleware: begin */
export * from '../bean/middleware.captchaVerify.js';

import 'vona';
declare module 'vona' {
  export interface IMiddlewareRecordLocal {
    'a-captcha:captchaVerify': never;
  }
}
/** middleware: end */
/** controllers: begin */
export * from '../controller/captcha.js';
/** controllers: end */
/** services: begin */
export * from '../service/captcha.js';
import { ServiceCaptcha } from '../service/captcha.js';
export interface IModuleService {
  captcha: ServiceCaptcha;
}
import 'vona';
declare module 'vona' {
  export interface IBeanRecordGeneral {
    'a-captcha.service.captcha': ServiceCaptcha;
  }
}
/** services: end */
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
/** error: begin */
export * from '../config/errors.js';
import { Errors } from '../config/errors.js';
/** error: end */
/** scope: begin */
import { BeanScopeBase, Scope, TypeLocaleBase, TypeModuleResource } from 'vona';

@Scope()
export class ScopeModuleACaptcha extends BeanScopeBase {}

export interface ScopeModuleACaptcha
  extends TypeModuleResource<
    typeof config,
    typeof Errors,
    (typeof locales)[TypeLocaleBase],
    never,
    IModuleService,
    never,
    never
  > {}

import 'vona';
declare module 'vona' {
  export interface IBeanScopeRecord {
    'a-captcha': ScopeModuleACaptcha;
  }

  export interface IBeanScopeContainer {
    captcha: ScopeModuleACaptcha;
  }

  export interface IBeanScopeConfig {
    'a-captcha': ReturnType<typeof config>;
  }

  export interface IBeanScopeLocale {
    'a-captcha': (typeof locales)[TypeLocaleBase];
  }
}

export function locale<K extends keyof (typeof locales)[TypeLocaleBase]>(key: K): `a-captcha:${K}` {
  return `a-captcha:${key}`;
}
/** scope: end */
