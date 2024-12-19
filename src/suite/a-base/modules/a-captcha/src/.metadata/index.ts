/** middleware: begin */
export * from '../bean/middleware.captchaVerify.js';

import 'vona';
declare module 'vona-module-a-aspect' {
  export interface IMiddlewareRecordLocal {
    'a-captcha:captchaVerify': never;
  }
}
declare module 'vona-module-a-captcha' {
  export interface MiddlewareCaptchaVerify {
    /** @internal */
    get scope(): ScopeModuleACaptcha;
  }
}
/** middleware: end */
/** bean: begin */
export * from '../bean/bean.captcha.js';

import 'vona';
declare module 'vona' {}
declare module 'vona-module-a-captcha' {
  export interface BeanCaptcha {
    /** @internal */
    get scope(): ScopeModuleACaptcha;
  }
}
/** bean: end */
/** bean: begin */
import { BeanCaptcha } from '../bean/bean.captcha.js';
import 'vona';
declare module 'vona' {
  export interface IBeanRecordGlobal {
    captcha: BeanCaptcha;
  }
}
/** bean: end */
/** service: begin */
export * from '../service/captcha.js';

import 'vona';
declare module 'vona' {
  export interface IServiceRecord {
    'a-captcha:captcha': never;
  }
}
declare module 'vona-module-a-captcha' {
  export interface ServiceCaptcha {
    /** @internal */
    get scope(): ScopeModuleACaptcha;
  }
}
/** service: end */
/** service: begin */
import { ServiceCaptcha } from '../service/captcha.js';
export interface IModuleService {
  captcha: ServiceCaptcha;
}
/** service: end */
/** service: begin */
import 'vona';
declare module 'vona' {
  export interface IBeanRecordGeneral {
    'a-captcha.service.captcha': ServiceCaptcha;
  }
}
/** service: end */
/** controller: begin */
export * from '../controller/captcha.js';

import { IDecoratorControllerOptions } from 'vona-module-a-web';
declare module 'vona-module-a-web' {
  export interface IControllerRecord {
    'a-captcha:captcha': IDecoratorControllerOptions;
  }
}
declare module 'vona-module-a-captcha' {
  export interface ControllerCaptcha {
    /** @internal */
    get scope(): ScopeModuleACaptcha;
  }
}
/** controller: end */
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
import {
  BeanScopeBase,
  TypeModuleBean,
  BeanScopeUtil,
  TypeModuleConfig,
  TypeModuleErrors,
  TypeModuleLocales,
  TypeLocaleBase,
} from 'vona';
import { Scope } from 'vona-module-a-bean';

@Scope()
export class ScopeModuleACaptcha extends BeanScopeBase {}

export interface ScopeModuleACaptcha {
  _bean: TypeModuleBean;
  util: BeanScopeUtil;
  config: TypeModuleConfig<typeof config>;
  error: TypeModuleErrors<typeof Errors>;
  locale: TypeModuleLocales<(typeof locales)[TypeLocaleBase]>;
  service: IModuleService;
}

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
