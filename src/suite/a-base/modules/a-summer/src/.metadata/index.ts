/** beans: begin */
export * from '../bean/bean.summer.js';
export * from '../bean/broadcast.memClear.js';
export * from '../bean/broadcast.memDel.js';
export * from '../bean/broadcast.memMultiDel.js';
export * from '../bean/version.manager.js';
import { BeanSummer } from '../bean/bean.summer.js';

import 'vona';
declare module 'vona' {
  export interface IBeanRecordGlobal {
    summer: BeanSummer;
  }
}
/** beans: end */
/** services: begin */
export * from '../service/cache.js';
export * from '../service/fetch.js';
export * from '../service/mem.js';
export * from '../service/redis.js';
import { ServiceCache } from '../service/cache.js';
import { ServiceFetch } from '../service/fetch.js';
import { ServiceMem } from '../service/mem.js';
import { ServiceRedis } from '../service/redis.js';
export interface IModuleService {
  cache: ServiceCache;
  fetch: ServiceFetch;
  mem: ServiceMem;
  redis: ServiceRedis;
}
import 'vona';
declare module 'vona' {
  export interface IBeanRecordGeneral {
    'a-summer.service.cache': ServiceCache;
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

export interface ScopeModuleASummer
  extends TypeModuleResource<typeof config, never, never, never, IModuleService, never> {}

import 'vona';
declare module 'vona' {
  export interface IBeanScopeRecord {
    'a-summer': ScopeModuleASummer;
  }

  export interface IBeanScopeContainer {
    summer: ScopeModuleASummer;
  }

  export interface IBeanScopeConfig {
    'a-summer': ReturnType<typeof config>;
  }
}
/** scope: end */
