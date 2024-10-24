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
import 'vona';
declare module 'vona' {
  export interface IBeanRecord {
    cache: BeanCache;
    cacheDb: BeanCacheDb;
    cacheMem: BeanCacheMem;
    cacheRedis: BeanCacheRedis;
  }
}
/** beans: end */
/** controllers: begin */
export * from '../controller/db.js';
/** controllers: end */
/** entities: begin */
export * from '../entity/cache.js';
/** entities: end */
/** config: begin */
export * from '../config/config.js';
import { config } from '../config/config.js';
/** config: end */
/** scope: begin */
import { BeanScopeBase, Scope, TypeModuleResource } from 'vona';

@Scope()
export class ScopeModuleACache extends BeanScopeBase {}

export interface ScopeModuleACache extends TypeModuleResource<typeof config, any, any, any, any, any> {}

import 'vona';
declare module 'vona' {
  export interface IBeanScopeRecord {
    'a-cache': ScopeModuleACache;
  }

  export interface IBeanScopeConfig {
    'a-cache': ReturnType<typeof config>;
  }
}
/** scope: end */
