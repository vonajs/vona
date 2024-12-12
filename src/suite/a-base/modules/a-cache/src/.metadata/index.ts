/** beans: begin */
export * from '../bean/bean.cache.js';
export * from '../bean/bean.cacheDb.js';
export * from '../bean/bean.cacheMem.js';
export * from '../bean/bean.cacheRedis.js';
export * from '../bean/broadcast.memClear.js';
export * from '../bean/broadcast.memRemove.js';
export * from '../bean/version.manager.js';
import { BeanCache } from '../bean/bean.cache.js';
import { BeanCacheDb } from '../bean/bean.cacheDb.js';
import { BeanCacheMem } from '../bean/bean.cacheMem.js';
import { BeanCacheRedis } from '../bean/bean.cacheRedis.js';
import { BroadcastMemClear } from '../bean/broadcast.memClear.js';
import { BroadcastMemRemove } from '../bean/broadcast.memRemove.js';
import { VersionManager } from '../bean/version.manager.js';
import 'vona';
declare module 'vona' {
  export interface IBeanRecordGlobal {
    cache: BeanCache;
    cacheDb: BeanCacheDb;
    cacheMem: BeanCacheMem;
    cacheRedis: BeanCacheRedis;
  }

  export interface IBeanRecordGeneral {
    'a-cache.broadcast.memClear': BroadcastMemClear;
    'a-cache.broadcast.memRemove': BroadcastMemRemove;
    'a-cache.version.manager': VersionManager;
  }
}
declare module 'vona-module-a-cache' {
  export interface BeanCache {
    get scope(): ScopeModuleACache;
  }

  export interface BeanCacheDb {
    get scope(): ScopeModuleACache;
  }

  export interface BeanCacheMem {
    get scope(): ScopeModuleACache;
  }

  export interface BeanCacheRedis {
    get scope(): ScopeModuleACache;
  }

  export interface BroadcastMemClear {
    get scope(): ScopeModuleACache;
  }

  export interface BroadcastMemRemove {
    get scope(): ScopeModuleACache;
  }

  export interface VersionManager {
    get scope(): ScopeModuleACache;
  }
}
/** beans: end */
/** entity: begin */
export * from '../entity/cache.js';

import { IDecoratorEntityOptions } from 'vona';
declare module 'vona' {
  export interface IEntityRecord {
    'a-cache:cache': IDecoratorEntityOptions;
  }
}
declare module 'vona-module-a-cache' {}
/** entity: end */
/** controller: begin */
export * from '../controller/db.js';

import { IDecoratorControllerOptions } from 'vona';
declare module 'vona' {
  export interface IControllerRecord {
    'a-cache:db': IDecoratorControllerOptions;
  }
}
declare module 'vona-module-a-cache' {
  export interface ControllerDb {
    get scope(): ScopeModuleACache;
  }
}
/** controller: end */
/** meta: begin */
export * from '../bean/meta.redlock.js';

import 'vona';
declare module 'vona' {
  export interface IMetaRecord {
    'a-cache:redlock': never;
  }
}
declare module 'vona-module-a-cache' {
  export interface MetaRedlock {
    get scope(): ScopeModuleACache;
  }
}
/** meta: end */
/** meta redlock: begin */
import { MetaRedlock } from '../bean/meta.redlock.js';
/** meta redlock: end */
/** entities: begin */
import { EntityCache } from '../entity/cache.js';
export interface IModuleEntity {
  cache: EntityCache;
}
declare module 'vona-module-a-cache' {
  export interface EntityCache {
    column: <K extends keyof Omit<EntityCache, 'column' | 'columns' | 'table'>>(column: K) => K;
    columns: <K extends keyof Omit<EntityCache, 'column' | 'columns' | 'table'>>(...columns: K[]) => K[];
  }
}
/** entities: end */
/** config: begin */
export * from '../config/config.js';
import { config } from '../config/config.js';
/** config: end */
/** scope: begin */
import { BeanScopeBase, Scope, TypeModuleBean, BeanScopeUtil, TypeModuleConfig } from 'vona';

@Scope()
export class ScopeModuleACache extends BeanScopeBase {}

export interface ScopeModuleACache {
  _bean: TypeModuleBean;
  util: BeanScopeUtil;
  config: TypeModuleConfig<typeof config>;
  redlock: MetaRedlock;
  entity: IModuleEntity;
  queue: IModulequeue;
}

import 'vona';
declare module 'vona' {
  export interface IBeanScopeRecord {
    'a-cache': ScopeModuleACache;
  }

  export interface IBeanScopeContainer {
    cache: ScopeModuleACache;
  }

  export interface IBeanScopeConfig {
    'a-cache': ReturnType<typeof config>;
  }
}

/** scope: end */
