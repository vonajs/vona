/* eslint-disable */
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
