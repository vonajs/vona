import type { BeanScopeUtil } from 'vona';
/** cacheRedis: begin */
import type { IDecoratorCacheRedisOptions } from 'vona-module-a-cache';

/** cacheRedis: end */
/** cacheRedis: begin */
import type { CacheRedisElection } from '../bean/cacheRedis.election.ts';
/** service: end */
/** service: begin */
import type { ServiceElection } from '../service/election.ts';
/** monkey: end */
/** scope: begin */
import { BeanScopeBase } from 'vona';
/** service: end */
/** service: begin */

import { Scope } from 'vona-module-a-bean';
import 'vona';
import 'vona';

import 'vona';

export * from '../bean/cacheRedis.election.ts';
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
export interface IModuleCacheRedis {
  election: CacheRedisElection;
}
/** service: end */
/** monkey: begin */
export * from '../monkey.ts';
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
export interface IModuleService {
  election: ServiceElection;
}
declare module 'vona' {
  export interface IBeanRecordGeneral {
    'a-election.service.election': ServiceElection;
  }
}
/** cacheRedis: end */
/** service: begin */
export * from '../service/election.ts';

@Scope()
export class ScopeModuleAElection extends BeanScopeBase {}

export interface ScopeModuleAElection {
  util: BeanScopeUtil;
  cacheRedis: IModuleCacheRedis;
  service: IModuleService;
}
declare module 'vona' {
  export interface IBeanScopeRecord {
    'a-election': ScopeModuleAElection;
  }

  export interface IBeanScopeContainer {
    election: ScopeModuleAElection;
  }

}

/** scope: end */
