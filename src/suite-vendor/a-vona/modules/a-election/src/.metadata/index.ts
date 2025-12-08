/* eslint-disable */
/** service: begin */
export * from '../service/election.ts';

import 'vona-module-a-bean';
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
/** broadcast: begin */
export * from '../bean/broadcast.release.ts';

import { type IDecoratorBroadcastOptions } from 'vona-module-a-broadcast';
declare module 'vona-module-a-broadcast' {
  
    export interface IBroadcastRecord {
      'a-election:release': IDecoratorBroadcastOptions;
    }

  
}
declare module 'vona-module-a-election' {
  
        export interface BroadcastRelease {
          /** @internal */
          get scope(): ScopeModuleAElection;
        }

          export interface BroadcastRelease {
            get $beanFullName(): 'a-election.broadcast.release';
            get $onionName(): 'a-election:release';
            get $onionOptions(): IDecoratorBroadcastOptions;
          } 
}
/** broadcast: end */
/** broadcast: begin */
import type { BroadcastRelease } from '../bean/broadcast.release.ts';
export interface IModuleBroadcast {
  'release': BroadcastRelease;
}
/** broadcast: end */
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
            get $onionOptions(): IDecoratorCacheRedisOptions;
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
broadcast: IModuleBroadcast;
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
