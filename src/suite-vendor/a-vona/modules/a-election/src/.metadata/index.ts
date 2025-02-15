/** cacheRedis: begin */
export * from '../bean/cacheRedis.election.js';

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
}
/** cacheRedis: end */
/** cacheRedis: begin */
import type { CacheRedisElection } from '../bean/cacheRedis.election.js';
export interface IModuleCacheRedis {
  election: CacheRedisElection;
}
/** cacheRedis: end */
/** service: begin */
export * from '../service/election.js';

import 'vona';
declare module 'vona-module-a-web' {
  export interface IServiceRecord {
    'a-election:election': never;
  }
}
declare module 'vona-module-a-election' {
  export interface ServiceElection {
    /** @internal */
    get scope(): ScopeModuleAElection;
  }
}
/** service: end */
/** service: begin */
import type { ServiceElection } from '../service/election.js';
export interface IModuleService {
  election: ServiceElection;
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
/** scope: begin */
import type { BeanScopeUtil } from 'vona';
import { BeanScopeBase } from 'vona';
import { Scope } from 'vona-module-a-bean';

@Scope()
export class ScopeModuleAElection extends BeanScopeBase {}

export interface ScopeModuleAElection {
  util: BeanScopeUtil;
  cacheRedis: IModuleCacheRedis;
  service: IModuleService;
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
