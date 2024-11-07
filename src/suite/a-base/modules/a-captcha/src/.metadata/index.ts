/** beans: begin */
export * from '../bean/bean.captcha.js';
export * from '../bean/middleware.captchaVerify.js';
import { BeanCaptcha } from '../bean/bean.captcha.js';
import { MiddlewareCaptchaVerify } from '../bean/middleware.captchaVerify.js';
import 'vona';
declare module 'vona' {
  export interface IBeanRecordGlobal {
    captcha: BeanCaptcha;
  }

  export interface IBeanRecordGeneral {
    'a-captcha.middleware.captchaVerify': MiddlewareCaptchaVerify;
  }
}
/** beans: end */
/** controllers: begin */
export * from '../controller/captcha.js';
import { ControllerCaptcha } from '../controller/captcha.js';
export const controllers = {
  captcha: ControllerCaptcha,
};
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
    any,
    IModuleService,
    any
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
/** scope: end */
