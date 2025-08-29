/* eslint-disable */
import type { TypeSymbolKeyFieldsMore } from 'vona-module-a-orm';
import type { TypeEntityOptionsFields,TypeControllerOptionsActions } from 'vona-module-a-openapi';
/** middleware: begin */
export * from '../bean/middleware.captcha.ts';
import type { IMiddlewareOptionsCaptcha } from '../bean/middleware.captcha.ts';
import 'vona';
declare module 'vona-module-a-aspect' {
  
  
export interface IMiddlewareRecordLocal {
  'a-captcha:captcha': IMiddlewareOptionsCaptcha;
}

}
declare module 'vona-module-a-captcha' {
  
        export interface MiddlewareCaptcha {
          /** @internal */
          get scope(): ScopeModuleACaptcha;
        }

          export interface MiddlewareCaptcha {
            get $beanFullName(): 'a-captcha.middleware.captcha';
            get $onionName(): 'a-captcha:captcha';
          } 
}
/** middleware: end */
/** bean: begin */
export * from '../bean/bean.captcha.ts';

import 'vona';
declare module 'vona' {
  
  
}
declare module 'vona-module-a-captcha' {
  
        export interface BeanCaptcha {
          /** @internal */
          get scope(): ScopeModuleACaptcha;
        } 
}
/** bean: end */
/** bean: begin */
import type { BeanCaptcha } from '../bean/bean.captcha.ts';
import 'vona';  
declare module 'vona' {
  export interface IBeanRecordGlobal {
    'captcha': BeanCaptcha;
  }
}
/** bean: end */
/** cacheRedis: begin */
export * from '../bean/cacheRedis.captcha.ts';

import { type IDecoratorCacheRedisOptions } from 'vona-module-a-cache';
declare module 'vona-module-a-cache' {
  
    export interface ICacheRedisRecord {
      'a-captcha:captcha': IDecoratorCacheRedisOptions;
    }

  
}
declare module 'vona-module-a-captcha' {
  
        export interface CacheRedisCaptcha {
          /** @internal */
          get scope(): ScopeModuleACaptcha;
        }

          export interface CacheRedisCaptcha {
            get $beanFullName(): 'a-captcha.cacheRedis.captcha';
            get $onionName(): 'a-captcha:captcha';
          } 
}
/** cacheRedis: end */
/** cacheRedis: begin */
import type { CacheRedisCaptcha } from '../bean/cacheRedis.captcha.ts';
export interface IModuleCacheRedis {
  'captcha': CacheRedisCaptcha;
}
/** cacheRedis: end */
/** dto: begin */
export * from '../dto/captchaData.ts';
export * from '../dto/captchaVerify.ts';
import type { IDtoOptionsCaptchaData } from '../dto/captchaData.ts';
import type { IDtoOptionsCaptchaVerify } from '../dto/captchaVerify.ts';
import 'vona';
declare module 'vona-module-a-web' {
  
    export interface IDtoRecord {
      'a-captcha:captchaData': IDtoOptionsCaptchaData;
'a-captcha:captchaVerify': IDtoOptionsCaptchaVerify;
    }

  
}
declare module 'vona-module-a-captcha' {
   
}
/** dto: end */
/** dto: begin */
import type { DtoCaptchaData } from '../dto/captchaData.ts';
import type { DtoCaptchaVerify } from '../dto/captchaVerify.ts'; 
declare module 'vona-module-a-captcha' {
  
    export interface IDtoOptionsCaptchaData {
      fields?: TypeEntityOptionsFields<DtoCaptchaData, IDtoOptionsCaptchaData[TypeSymbolKeyFieldsMore]>;
    }

    export interface IDtoOptionsCaptchaVerify {
      fields?: TypeEntityOptionsFields<DtoCaptchaVerify, IDtoOptionsCaptchaVerify[TypeSymbolKeyFieldsMore]>;
    }
}
/** dto: end */
/** controller: begin */
export * from '../controller/captcha.ts';
import type { IControllerOptionsCaptcha } from '../controller/captcha.ts';
import 'vona';
declare module 'vona-module-a-web' {
  
    export interface IControllerRecord {
      'a-captcha:captcha': IControllerOptionsCaptcha;
    }

  
}
declare module 'vona-module-a-captcha' {
  
        export interface ControllerCaptcha {
          /** @internal */
          get scope(): ScopeModuleACaptcha;
        }

          export interface ControllerCaptcha {
            get $beanFullName(): 'a-captcha.controller.captcha';
            get $onionName(): 'a-captcha:captcha';
          } 
}
/** controller: end */
/** controller: begin */
// @ts-ignore ignore
import type { ControllerCaptcha } from '../controller/captcha.ts';
declare module 'vona-module-a-captcha' {
  
    export interface IControllerOptionsCaptcha {
      actions?: TypeControllerOptionsActions<ControllerCaptcha>;
    }
}
declare module 'vona-module-a-web' {
  export interface IApiPathPostRecord{
        '/captcha/create': undefined;
'/captcha/refresh': undefined;
'/captcha/verifyImmediate': undefined;
    }

}
/** controller: end */
/** config: begin */
export * from '../config/config.ts';
import type { config } from '../config/config.ts';
/** config: end */
/** locale: begin */
import locale_en_us from '../config/locale/en-us.ts';
import locale_zh_cn from '../config/locale/zh-cn.ts';
export const locales = {
  'en-us': locale_en_us,
'zh-cn': locale_zh_cn,
};
/** locale: end */
/** scope: begin */
import { BeanScopeBase, type BeanScopeUtil, type TypeModuleConfig, type TypeModuleLocales, type TypeLocaleBase } from 'vona';
import { Scope } from 'vona-module-a-bean';

@Scope()
export class ScopeModuleACaptcha extends BeanScopeBase {}

export interface ScopeModuleACaptcha {
  util: BeanScopeUtil;
config: TypeModuleConfig<typeof config>;
locale: TypeModuleLocales<(typeof locales)[TypeLocaleBase]>;
cacheRedis: IModuleCacheRedis;
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

export function $locale<K extends keyof (typeof locales)[TypeLocaleBase]>(key: K): `a-captcha::${K}` {
  return `a-captcha::${key}`;
}
/** scope: end */
