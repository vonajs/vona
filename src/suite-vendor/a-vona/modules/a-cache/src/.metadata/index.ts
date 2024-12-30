/** bean: begin */
export * from '../bean/bean.cache.js';
export * from '../bean/bean.cacheMemBase.js';
export * from '../bean/bean.cacheMemRedis.js';

import 'vona';
declare module 'vona' {}
declare module 'vona-module-a-cache' {
  export interface BeanCache {
    /** @internal */
    get scope(): ScopeModuleACache;
  }
}
/** bean: end */
/** bean: begin */
import { BeanCache } from '../bean/bean.cache.js';
import 'vona';
declare module 'vona' {
  export interface IBeanRecordGlobal {
    cache: BeanCache;
  }
}
/** bean: end */
/** broadcast: begin */
export * from '../bean/broadcast.memDel.js';

import { IDecoratorBroadcastOptions } from 'vona-module-a-broadcast';
declare module 'vona-module-a-broadcast' {
  export interface IBroadcastRecord {
    'a-cache:memDel': IDecoratorBroadcastOptions;
  }
}
declare module 'vona-module-a-cache' {
  export interface BroadcastMemDel {
    /** @internal */
    get scope(): ScopeModuleACache;
  }
}
/** broadcast: end */
/** broadcast: begin */
import { BroadcastMemDel } from '../bean/broadcast.memDel.js';
export interface IModuleBroadcast {
  memDel: BroadcastMemDel;
}
/** broadcast: end */
/** config: begin */
export * from '../config/config.js';
import { config } from '../config/config.js';
/** config: end */
/** scope: begin */
import { BeanScopeBase, BeanScopeUtil, TypeModuleConfig } from 'vona';
import { Scope } from 'vona-module-a-bean';

@Scope()
export class ScopeModuleACache extends BeanScopeBase {}

export interface ScopeModuleACache {
  util: BeanScopeUtil;
  config: TypeModuleConfig<typeof config>;
  broadcast: IModuleBroadcast;
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
