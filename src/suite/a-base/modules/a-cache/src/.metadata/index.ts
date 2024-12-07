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
/** beans: end */
/** entity: begin */
export * from '../entity/cache.js';

import { IDecoratorEntityOptions } from 'vona';
declare module 'vona' {
  export interface IEntityRecord {
    'a-cache:cache': IDecoratorEntityOptions;
  }
}
/** entity: end */
/** controller: begin */
export * from '../controller/db.js';

import { IDecoratorControllerOptions } from 'vona';
declare module 'vona' {
  export interface IControllerRecord {
    'a-cache:db': IDecoratorControllerOptions;
  }
}
/** controller: end */
/** entities: begin */
import { EntityCache } from '../entity/cache.js';
export interface IModuleEntity {
  cache: EntityCache;
}
/** entities: end */
/** config: begin */
export * from '../config/config.js';
import { config } from '../config/config.js';
/** config: end */
/** scope: begin */
import { BeanScopeBase, Scope, TypeModuleResource } from 'vona';

@Scope()
export class ScopeModuleACache extends BeanScopeBase {}

export interface ScopeModuleACache
  extends TypeModuleResource<typeof config, never, never, never, never, never, never, IModuleEntity, never> {}

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
