/** beans: begin */
export * from '../bean/captcha.provider.captcha.js';
import { CaptchaProviderCaptcha } from '../bean/captcha.provider.captcha.js';
import 'vona';
declare module 'vona' {
  export interface IBeanRecordGlobal {}

  export interface IBeanRecordGeneral {
    'a-captchasimple.captcha.provider.captcha': CaptchaProviderCaptcha;
  }
}
declare module 'vona-module-a-captchasimple' {
  export interface CaptchaProviderCaptcha {
    /** @internal */
    get scope(): ScopeModuleACaptchasimple;
  }
}
/** beans: end */
/** controller: begin */
export * from '../controller/captcha.js';

import { IDecoratorControllerOptions } from 'vona-module-a-web';
declare module 'vona-module-a-web' {
  export interface IControllerRecord {
    'a-captchasimple:captcha': IDecoratorControllerOptions;
  }
}
declare module 'vona-module-a-captchasimple' {
  export interface ControllerCaptcha {
    /** @internal */
    get scope(): ScopeModuleACaptchasimple;
  }
}
/** controller: end */
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
  TypeModuleErrors,
  TypeModuleLocales,
  TypeLocaleBase,
} from 'vona';
import { Scope } from 'vona-module-a-bean';

@Scope()
export class ScopeModuleACaptchasimple extends BeanScopeBase {}

export interface ScopeModuleACaptchasimple {
  _bean: TypeModuleBean;
  util: BeanScopeUtil;
  error: TypeModuleErrors<typeof Errors>;
  locale: TypeModuleLocales<(typeof locales)[TypeLocaleBase]>;
}

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

export function locale<K extends keyof (typeof locales)[TypeLocaleBase]>(key: K): `a-captchasimple:${K}` {
  return `a-captchasimple:${key}`;
}
/** scope: end */
