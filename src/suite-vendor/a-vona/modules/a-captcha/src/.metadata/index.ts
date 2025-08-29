/* eslint-disable */
import type { TypeSymbolKeyFieldsMore } from 'vona-module-a-orm';
import type { TypeEntityOptionsFields,TypeControllerOptionsActions } from 'vona-module-a-openapi';
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
import type { IDtoOptionsCaptchaData } from '../dto/captchaData.ts';
import 'vona';
declare module 'vona-module-a-web' {
  
    export interface IDtoRecord {
      'a-captcha:captchaData': IDtoOptionsCaptchaData;
    }

  
}
declare module 'vona-module-a-captcha' {
   
}
/** dto: end */
/** dto: begin */
import type { DtoCaptchaData } from '../dto/captchaData.ts'; 
declare module 'vona-module-a-captcha' {
  
    export interface IDtoOptionsCaptchaData {
      fields?: TypeEntityOptionsFields<DtoCaptchaData, IDtoOptionsCaptchaData[TypeSymbolKeyFieldsMore]>;
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
    }

}
/** controller: end */
/** config: begin */
export * from '../config/config.ts';
import type { config } from '../config/config.ts';
/** config: end */
/** scope: begin */
import { BeanScopeBase, type BeanScopeUtil, type TypeModuleConfig } from 'vona';
import { Scope } from 'vona-module-a-bean';

@Scope()
export class ScopeModuleACaptcha extends BeanScopeBase {}

export interface ScopeModuleACaptcha {
  util: BeanScopeUtil;
config: TypeModuleConfig<typeof config>;
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

  
}

/** scope: end */
