/** cacheRedis: begin */
export * from '../bean/cacheRedis.startupDebounce.js';

import { IDecoratorCacheRedisOptions } from 'vona-module-a-cache';
declare module 'vona-module-a-cache' {
  export interface ICacheRedisRecord {
    'a-startup:startupDebounce': IDecoratorCacheRedisOptions;
  }
}
declare module 'vona-module-a-startup' {
  export interface CacheRedisStartupDebounce {
    /** @internal */
    get scope(): ScopeModuleAStartup;
  }
}
/** cacheRedis: end */
/** cacheRedis: begin */
import { CacheRedisStartupDebounce } from '../bean/cacheRedis.startupDebounce.js';
export interface IModuleCacheRedis {
  startupDebounce: CacheRedisStartupDebounce;
}
/** cacheRedis: end */
/** meta: begin */
export * from '../bean/meta.redlock.js';

import 'vona';
declare module 'vona' {
  export interface IMetaRecord {
    'a-startup:redlock': never;
  }
}
declare module 'vona-module-a-startup' {
  export interface MetaRedlock {
    /** @internal */
    get scope(): ScopeModuleAStartup;
  }
}
/** meta: end */
/** meta redlock: begin */
import { MetaRedlock } from '../bean/meta.redlock.js';
/** meta redlock: end */
/** service: begin */
export * from '../service/startup.js';

import 'vona';
declare module 'vona-module-a-web' {
  export interface IServiceRecord {
    'a-startup:startup': never;
  }
}
declare module 'vona-module-a-startup' {
  export interface ServiceStartup {
    /** @internal */
    get scope(): ScopeModuleAStartup;
  }
}
/** service: end */
/** service: begin */
import { ServiceStartup } from '../service/startup.js';
export interface IModuleService {
  startup: ServiceStartup;
}
/** service: end */
/** service: begin */

import 'vona';
declare module 'vona' {
  export interface IBeanRecordGeneral {
    'a-startup.service.startup': ServiceStartup;
  }
}
/** service: end */
/** config: begin */
export * from '../config/config.js';
import { config } from '../config/config.js';
/** config: end */
/** scope: begin */
import { BeanScopeBase, BeanScopeUtil, TypeModuleConfig } from 'vona';
import { Scope } from 'vona-module-a-bean';

@Scope()
export class ScopeModuleAStartup extends BeanScopeBase {}

export interface ScopeModuleAStartup {
  util: BeanScopeUtil;
  config: TypeModuleConfig<typeof config>;
  cacheRedis: IModuleCacheRedis;
  redlock: MetaRedlock;
  service: IModuleService;
}

import 'vona';
declare module 'vona' {
  export interface IBeanScopeRecord {
    'a-startup': ScopeModuleAStartup;
  }

  export interface IBeanScopeContainer {
    startup: ScopeModuleAStartup;
  }

  export interface IBeanScopeConfig {
    'a-startup': ReturnType<typeof config>;
  }
}

/** scope: end */
