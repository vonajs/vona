/** main: end */
/** scope: begin */
import type { BeanScopeUtil } from 'vona';
import type { TypeModuleConfig } from 'vona';
import type { IDecoratorBroadcastOptions } from 'vona-module-a-broadcast';

import type { IDecoratorCacheRedisOptions } from 'vona-module-a-cache';
/** bean: end */
/** bean: begin */
import type { BeanWorker } from '../bean/bean.worker.js';
/** broadcast: end */
/** broadcast: begin */
import type { BroadcastExitAll } from '../bean/broadcast.exitAll.js';

import type { BroadcastReloadAll } from '../bean/broadcast.reloadAll.js';
/** cacheRedis: end */
/** cacheRedis: begin */
import type { CacheRedisWorkerAlive } from '../bean/cacheRedis.workerAlive.js';
import type { config } from '../config/config.js';
import { BeanScopeBase } from 'vona';
import { Scope } from 'vona-module-a-bean';
/** bean: begin */
import 'vona';
import 'vona';

import 'vona';

export * from '../bean/bean.worker.js';
declare module 'vona' {}
declare module 'vona-module-a-worker' {
  export interface BeanWorker {
    /** @internal */
    get scope(): ScopeModuleAWorker;
  }
}
declare module 'vona' {
  export interface IBeanRecordGlobal {
    worker: BeanWorker;
  }
}
/** bean: end */
/** broadcast: begin */
export * from '../bean/broadcast.exitAll.js';
export * from '../bean/broadcast.reloadAll.js';
declare module 'vona-module-a-broadcast' {
  export interface IBroadcastRecord {
    'a-worker:exitAll': IDecoratorBroadcastOptions;
    'a-worker:reloadAll': IDecoratorBroadcastOptions;
  }
}
declare module 'vona-module-a-worker' {
  export interface BroadcastExitAll {
    /** @internal */
    get scope(): ScopeModuleAWorker;
  }

  export interface BroadcastReloadAll {
    /** @internal */
    get scope(): ScopeModuleAWorker;
  }
}
export interface IModuleBroadcast {
  exitAll: BroadcastExitAll;
  reloadAll: BroadcastReloadAll;
}
/** broadcast: end */
/** cacheRedis: begin */
export * from '../bean/cacheRedis.workerAlive.js';
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
export interface IModuleCacheRedis {
  workerAlive: CacheRedisWorkerAlive;
}
/** cacheRedis: end */
/** config: begin */
export * from '../config/config.js';
/** monkey: end */
/** main: begin */
export * from '../main.js';
/** config: end */
/** monkey: begin */
export * from '../monkey.js';

@Scope()
export class ScopeModuleAWorker extends BeanScopeBase {}

export interface ScopeModuleAWorker {
  util: BeanScopeUtil;
  config: TypeModuleConfig<typeof config>;
  broadcast: IModuleBroadcast;
  cacheRedis: IModuleCacheRedis;
}
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
