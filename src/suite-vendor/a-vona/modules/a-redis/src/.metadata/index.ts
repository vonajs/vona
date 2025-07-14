/* eslint-disable */
/** bean: begin */
export * from '../bean/bean.redis.ts';

import 'vona';
declare module 'vona' {
  
  
}
declare module 'vona-module-a-redis' {
  
        export interface BeanRedis {
          /** @internal */
          get scope(): ScopeModuleARedis;
        } 
}
/** bean: end */
/** bean: begin */
import type { BeanRedis } from '../bean/bean.redis.ts';
import 'vona';  
declare module 'vona' {
  export interface IBeanRecordGlobal {
    'redis': BeanRedis;
  }
}
/** bean: end */
/** service: begin */
export * from '../service/redisClient.ts';

import 'vona';
declare module 'vona-module-a-bean' {
  
    export interface IServiceRecord {
      'a-redis:redisClient': never;
    }

  
}
declare module 'vona-module-a-redis' {
  
        export interface ServiceRedisClient {
          /** @internal */
          get scope(): ScopeModuleARedis;
        }

          export interface ServiceRedisClient {
            get $beanFullName(): 'a-redis.service.redisClient';
            get $onionName(): 'a-redis:redisClient';
          } 
}
/** service: end */
/** service: begin */
import type { ServiceRedisClient } from '../service/redisClient.ts';
export interface IModuleService {
  'redisClient': ServiceRedisClient;
}
/** service: end */
/** service: begin */

import 'vona';
declare module 'vona' {
  export interface IBeanRecordGeneral {
    'a-redis.service.redisClient': ServiceRedisClient;
  }
}
/** service: end */
/** main: begin */
export * from '../main.ts';
/** main: end */
/** scope: begin */
import { BeanScopeBase, type BeanScopeUtil } from 'vona';
import { Scope } from 'vona-module-a-bean';

@Scope()
export class ScopeModuleARedis extends BeanScopeBase {}

export interface ScopeModuleARedis {
  util: BeanScopeUtil;
service: IModuleService;
}

import 'vona';
declare module 'vona' {
  export interface IBeanScopeRecord {
    'a-redis': ScopeModuleARedis;
  }

  export interface IBeanScopeContainer {
    redis: ScopeModuleARedis;
  }
  
  

  
}

/** scope: end */
