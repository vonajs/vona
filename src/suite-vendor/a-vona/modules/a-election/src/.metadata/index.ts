/* eslint-disable */
/** service: begin */
export * from '../service/election.ts';

import 'vona';
declare module 'vona-module-a-bean' {
  
    export interface IServiceRecord {
      'a-election:election': never;
    }

  
}
declare module 'vona-module-a-election' {
  
        export interface ServiceElection {
          /** @internal */
          get scope(): ScopeModuleAElection;
        }

          export interface ServiceElection {
            get $beanFullName(): 'a-election.service.election';
            get $onionName(): 'a-election:election';
          } 
}
/** service: end */
/** service: begin */
import type { ServiceElection } from '../service/election.ts';
export interface IModuleService {
  'election': ServiceElection;
}
/** service: end */
/** service: begin */

import 'vona';
declare module 'vona' {
  export interface IBeanRecordGeneral {
    'a-election.service.election': ServiceElection;
  }
}
/** service: end */
/** cacheRedis: begin */
export * from '../bean/cacheRedis.election.ts';

import { type IDecoratorCacheRedisOptions } from 'vona-module-a-cache';
declare module 'vona-module-a-cache' {
  
    export interface ICacheRedisRecord {
      'a-election:election': IDecoratorCacheRedisOptions;
    }

  
}
declare module 'vona-module-a-election' {
  
        export interface CacheRedisElection {
          /** @internal */
          get scope(): ScopeModuleAElection;
        }

          export interface CacheRedisElection {
            get $beanFullName(): 'a-election.cacheRedis.election';
            get $onionName(): 'a-election:election';
          } 
}
/** cacheRedis: end */
/** cacheRedis: begin */
import type { CacheRedisElection } from '../bean/cacheRedis.election.ts';
export interface IModuleCacheRedis {
  'election': CacheRedisElection;
}
/** cacheRedis: end */
/** monkey: begin */
export * from '../monkey.ts';
/** monkey: end */
/** scope: begin */
import { BeanScopeBase, type BeanScopeUtil } from 'vona';
import { Scope } from 'vona-module-a-bean';

@Scope()
export class ScopeModuleAElection extends BeanScopeBase {}

export interface ScopeModuleAElection {
  util: BeanScopeUtil;
service: IModuleService;
cacheRedis: IModuleCacheRedis;
}

import 'vona';
declare module 'vona' {
  export interface IBeanScopeRecord {
    'a-election': ScopeModuleAElection;
  }

  export interface IBeanScopeContainer {
    election: ScopeModuleAElection;
  }
  
  

  

  
}

/** scope: end */
