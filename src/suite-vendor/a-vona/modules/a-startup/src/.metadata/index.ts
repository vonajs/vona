/** monkey: end */
/** scope: begin */
import type { BeanScopeUtil } from 'vona';
import type { TypeModuleConfig } from 'vona';

/** cacheRedis: begin */
import type { IDecoratorCacheRedisOptions } from 'vona-module-a-cache';
/** cacheRedis: end */
/** cacheRedis: begin */
import type { CacheRedisStartupDebounce } from '../bean/cacheRedis.startupDebounce.js';

/** meta: end */
/** meta redlock: begin */
import type { MetaRedlock } from '../bean/meta.redlock.js';
import type { config } from '../config/config.js';
/** service: end */
/** service: begin */
import type { ServiceStartup } from '../service/startup.js';
/** service: end */
/** service: begin */

import { BeanScopeBase } from 'vona';
import { Scope } from 'vona-module-a-bean';
import 'vona';
import 'vona';
import 'vona';

import 'vona';

export * from '../bean/cacheRedis.startupDebounce.js';
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
export interface IModuleCacheRedis {
  startupDebounce: CacheRedisStartupDebounce;
}
/** cacheRedis: end */
/** meta: begin */
export * from '../bean/meta.redlock.js';
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
/** service: end */
/** config: begin */
export * from '../config/config.js';
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
export interface IModuleService {
  startup: ServiceStartup;
}
declare module 'vona' {
  export interface IBeanRecordGeneral {
    'a-startup.service.startup': ServiceStartup;
  }
}
/** config: end */
/** monkey: begin */
export * from '../monkey.js';
/** meta redlock: end */
/** service: begin */
export * from '../service/startup.js';

@Scope()
export class ScopeModuleAStartup extends BeanScopeBase {}

export interface ScopeModuleAStartup {
  util: BeanScopeUtil;
  config: TypeModuleConfig<typeof config>;
  cacheRedis: IModuleCacheRedis;
  redlock: MetaRedlock;
  service: IModuleService;
}
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
