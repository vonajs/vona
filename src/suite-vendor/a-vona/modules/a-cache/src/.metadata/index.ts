/** bean: begin */
export * from '../bean/bean.cache.js';
export * from '../bean/bean.cacheMemBase.js';
export * from '../bean/bean.cacheRedisBase.js';

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
export * from '../bean/broadcast.memClear.js';
export * from '../bean/broadcast.memDel.js';
export * from '../bean/broadcast.memMultiDel.js';

import { type IDecoratorBroadcastOptions } from 'vona-module-a-broadcast';
declare module 'vona-module-a-broadcast' {
  export interface IBroadcastRecord {
    'a-cache:memClear': IDecoratorBroadcastOptions;
    'a-cache:memDel': IDecoratorBroadcastOptions;
    'a-cache:memMultiDel': IDecoratorBroadcastOptions;
  }
}
declare module 'vona-module-a-cache' {
  export interface BroadcastMemClear {
    /** @internal */
    get scope(): ScopeModuleACache;
  }

  export interface BroadcastMemDel {
    /** @internal */
    get scope(): ScopeModuleACache;
  }

  export interface BroadcastMemMultiDel {
    /** @internal */
    get scope(): ScopeModuleACache;
  }
}
/** broadcast: end */
/** broadcast: begin */
import { BroadcastMemClear } from '../bean/broadcast.memClear.js';
import { BroadcastMemDel } from '../bean/broadcast.memDel.js';
import { BroadcastMemMultiDel } from '../bean/broadcast.memMultiDel.js';
export interface IModuleBroadcast {
  memClear: BroadcastMemClear;
  memDel: BroadcastMemDel;
  memMultiDel: BroadcastMemMultiDel;
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
