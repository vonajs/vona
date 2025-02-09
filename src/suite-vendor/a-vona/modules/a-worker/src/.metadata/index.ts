/** bean: begin */
export * from '../bean/bean.worker.js';

import 'vona';
declare module 'vona' {}
declare module 'vona-module-a-worker' {
  export interface BeanWorker {
    /** @internal */
    get scope(): ScopeModuleAWorker;
  }
}
/** bean: end */
/** bean: begin */
import { BeanWorker } from '../bean/bean.worker.js';
import 'vona';
declare module 'vona' {
  export interface IBeanRecordGlobal {
    worker: BeanWorker;
  }
}
/** bean: end */
/** cacheRedis: begin */
export * from '../bean/cacheRedis.workerAlive.js';

import { IDecoratorCacheRedisOptions } from 'vona-module-a-cache';
declare module 'vona-module-a-cache' {
  export interface ICacheRedisRecord {
    'a-worker:workerAlive': IDecoratorCacheRedisOptions;
  }
}
declare module 'vona-module-a-worker' {
  export interface CacheRedisWorkerAlive {
    /** @internal */
    get scope(): ScopeModuleAWorker;
  }
}
/** cacheRedis: end */
/** cacheRedis: begin */
import { CacheRedisWorkerAlive } from '../bean/cacheRedis.workerAlive.js';
export interface IModuleCacheRedis {
  workerAlive: CacheRedisWorkerAlive;
}
/** cacheRedis: end */
/** config: begin */
export * from '../config/config.js';
import { config } from '../config/config.js';
/** config: end */
/** main: begin */
export * from '../main.js';
/** main: end */
/** scope: begin */
import { BeanScopeBase, BeanScopeUtil, TypeModuleConfig } from 'vona';
import { Scope } from 'vona-module-a-bean';

@Scope()
export class ScopeModuleAWorker extends BeanScopeBase {}

export interface ScopeModuleAWorker {
  util: BeanScopeUtil;
  config: TypeModuleConfig<typeof config>;
  cacheRedis: IModuleCacheRedis;
}

import 'vona';
declare module 'vona' {
  export interface IBeanScopeRecord {
    'a-worker': ScopeModuleAWorker;
  }

  export interface IBeanScopeContainer {
    worker: ScopeModuleAWorker;
  }

  export interface IBeanScopeConfig {
    'a-worker': ReturnType<typeof config>;
  }
}

/** scope: end */
