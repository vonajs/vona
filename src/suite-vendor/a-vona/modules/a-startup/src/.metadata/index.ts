/* eslint-disable */
/** cacheRedis: begin */
export * from '../bean/cacheRedis.startupDebounce.ts';

import { type IDecoratorCacheRedisOptions } from 'vona-module-a-cache';
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
import type { CacheRedisStartupDebounce } from '../bean/cacheRedis.startupDebounce.ts';
export interface IModuleCacheRedis {
  'startupDebounce': CacheRedisStartupDebounce;
}
/** cacheRedis: end */
/** meta: begin */
export * from '../bean/meta.redlock.ts';

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
import type { MetaRedlock } from '../bean/meta.redlock.ts';
/** meta redlock: end */
/** service: begin */
export * from '../service/startup.ts';

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
import type { ServiceStartup } from '../service/startup.ts';
export interface IModuleService {
  'startup': ServiceStartup;
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
export * from '../config/config.ts';
import type { config } from '../config/config.ts';
/** config: end */
/** monkey: begin */
export * from '../monkey.ts';
/** monkey: end */
/** scope: begin */
import { BeanScopeBase, type BeanScopeUtil, type TypeModuleConfig } from 'vona';
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
