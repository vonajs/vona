/** beans: begin */
export * from '../bean/bean.summer.js';
export * from '../bean/broadcast.memClear.js';
export * from '../bean/broadcast.memDel.js';
export * from '../bean/broadcast.memMultiDel.js';
export * from '../bean/version.manager.js';
import { BeanSummer } from '../bean/bean.summer.js';
import 'vona';
declare module 'vona' {
  export interface IBeanRecord {
    summer: BeanSummer;
  }
}
/** beans: end */
/** services: begin */
export * from '../service/cache.js';
export * from '../service/cacheBase.js';
export * from '../service/fetch.js';
export * from '../service/mem.js';
export * from '../service/redis.js';
import { ServiceCache } from '../service/cache.js';
import { ServiceCacheBase } from '../service/cacheBase.js';
import { ServiceFetch } from '../service/fetch.js';
import { ServiceMem } from '../service/mem.js';
import { ServiceRedis } from '../service/redis.js';
export interface IModuleService {
  cache: ServiceCache;
  cacheBase: ServiceCacheBase;
  fetch: ServiceFetch;
  mem: ServiceMem;
  redis: ServiceRedis;
}
import 'vona';
declare module 'vona' {
  export interface IBeanRecord {
    'a-summer.service.cache': ServiceCache;
    'a-summer.service.cacheBase': ServiceCacheBase;
    'a-summer.service.fetch': ServiceFetch;
    'a-summer.service.mem': ServiceMem;
    'a-summer.service.redis': ServiceRedis;
  }
}
/** services: end */
/** config: begin */
export * from '../config/config.js';
import { config } from '../config/config.js';
/** config: end */
/** scope: begin */
import { BeanScopeBase, Scope, TypeModuleResource } from 'vona';

@Scope()
export class ScopeModuleASummer extends BeanScopeBase {}

export interface ScopeModuleASummer extends TypeModuleResource<typeof config, any, any, any, IModuleService, any> {}

import 'vona';
declare module 'vona' {
  export interface IBeanScopeRecord {
    'a-summer': ScopeModuleASummer;
  }

  export interface IBeanScopeConfig {
    'a-summer': ReturnType<typeof config>;
  }
}
/** scope: end */
