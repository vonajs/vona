/** beans: begin */
export * from '../bean/version.manager.js';
import { VersionManager } from '../bean/version.manager.js';
import 'vona';
declare module 'vona' {
  export interface IBeanRecordGlobal {}

  export interface IBeanRecordGeneral {
    'a-cache.version.manager': VersionManager;
  }
}
declare module 'vona-module-a-cache' {
  export interface VersionManager {
    /** @internal */
    get scope(): ScopeModuleACache;
  }
}
/** beans: end */
/** entity: begin */
export * from '../entity/cache.js';

import { IDecoratorEntityOptions } from 'vona-module-a-database';
declare module 'vona-module-a-database' {
  export interface IEntityRecord {
    'a-cache:cache': IDecoratorEntityOptions;
  }
}
declare module 'vona-module-a-cache' {}
/** entity: end */
/** entity: begin */
import { EntityCache } from '../entity/cache.js';
export interface IModuleEntity {
  cache: EntityCache;
}
/** entity: end */
/** entity: begin */
declare module 'vona-module-a-cache' {
  export interface EntityCache {
    column: <K extends keyof Omit<EntityCache, 'column' | 'columns' | 'table'>>(column: K) => K;
    columns: <K extends keyof Omit<EntityCache, 'column' | 'columns' | 'table'>>(...columns: K[]) => K[];
  }
}
/** entity: end */
/** bean: begin */
export * from '../bean/bean.cache.js';
export * from '../bean/bean.cacheDb.js';
export * from '../bean/bean.cacheMem.js';
export * from '../bean/bean.cacheRedis.js';

import 'vona';
declare module 'vona' {}
declare module 'vona-module-a-cache' {
  export interface BeanCache {
    /** @internal */
    get scope(): ScopeModuleACache;
  }

  export interface BeanCacheDb {
    /** @internal */
    get scope(): ScopeModuleACache;
  }

  export interface BeanCacheMem {
    /** @internal */
    get scope(): ScopeModuleACache;
  }

  export interface BeanCacheRedis {
    /** @internal */
    get scope(): ScopeModuleACache;
  }
}
/** bean: end */
/** bean: begin */
import { BeanCache } from '../bean/bean.cache.js';
import { BeanCacheDb } from '../bean/bean.cacheDb.js';
import { BeanCacheMem } from '../bean/bean.cacheMem.js';
import { BeanCacheRedis } from '../bean/bean.cacheRedis.js';
import 'vona';
declare module 'vona' {
  export interface IBeanRecordGlobal {
    cache: BeanCache;
    cacheDb: BeanCacheDb;
    cacheMem: BeanCacheMem;
    cacheRedis: BeanCacheRedis;
  }
}
/** bean: end */
/** broadcast: begin */
export * from '../bean/broadcast.memClear.js';
export * from '../bean/broadcast.memRemove.js';

import { IDecoratorBroadcastOptions } from 'vona-module-a-broadcast';
declare module 'vona-module-a-broadcast' {
  export interface IBroadcastRecord {
    'a-cache:memClear': IDecoratorBroadcastOptions;
    'a-cache:memRemove': IDecoratorBroadcastOptions;
  }
}
declare module 'vona-module-a-cache' {
  export interface BroadcastMemClear {
    /** @internal */
    get scope(): ScopeModuleACache;
  }

  export interface BroadcastMemRemove {
    /** @internal */
    get scope(): ScopeModuleACache;
  }
}
/** broadcast: end */
/** broadcast: begin */
import { BroadcastMemClear } from '../bean/broadcast.memClear.js';
import { BroadcastMemRemove } from '../bean/broadcast.memRemove.js';
export interface IModuleBroadcast {
  memClear: BroadcastMemClear;
  memRemove: BroadcastMemRemove;
}
/** broadcast: end */
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
    /** @internal */
    get scope(): ScopeModuleACache;
  }
}
/** meta: end */
/** meta redlock: begin */
import { MetaRedlock } from '../bean/meta.redlock.js';
/** meta redlock: end */
/** controller: begin */
export * from '../controller/db.js';

import { IDecoratorControllerOptions } from 'vona-module-a-web';
declare module 'vona-module-a-web' {
  export interface IControllerRecord {
    'a-cache:db': IDecoratorControllerOptions;
  }
}
declare module 'vona-module-a-cache' {
  export interface ControllerDb {
    /** @internal */
    get scope(): ScopeModuleACache;
  }
}
/** controller: end */
/** config: begin */
export * from '../config/config.js';
import { config } from '../config/config.js';
/** config: end */
/** scope: begin */
import { BeanScopeBase, TypeModuleBean, BeanScopeUtil, TypeModuleConfig } from 'vona';
import { Scope } from 'vona-module-a-bean';

@Scope()
export class ScopeModuleACache extends BeanScopeBase {}

export interface ScopeModuleACache {
  _bean: TypeModuleBean;
  util: BeanScopeUtil;
  config: TypeModuleConfig<typeof config>;
  entity: IModuleEntity;
  broadcast: IModuleBroadcast;
  redlock: MetaRedlock;
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
