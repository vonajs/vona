/** beans: begin */
export * from '../bean/bean.summer.js';
export * from '../bean/bean.summerCacheBase_.js';
export * from '../bean/broadcast.memClear.js';
export * from '../bean/broadcast.memDel.js';
export * from '../bean/broadcast.memMultiDel.js';
import { BeanSummer } from '../bean/bean.summer.js';
import { BeanSummerCacheBase } from '../bean/bean.summerCacheBase_.js';
import { BroadcastMemClear } from '../bean/broadcast.memClear.js';
import { BroadcastMemDel } from '../bean/broadcast.memDel.js';
import { BroadcastMemMultiDel } from '../bean/broadcast.memMultiDel.js';
import 'vona';
declare module 'vona' {
  export interface IBeanRecordGlobal {
    summer: BeanSummer;
  }

  export interface IBeanRecordGeneral {
    summerCacheBase: BeanSummerCacheBase;
    'a-summer.broadcast.memClear': BroadcastMemClear;
    'a-summer.broadcast.memDel': BroadcastMemDel;
    'a-summer.broadcast.memMultiDel': BroadcastMemMultiDel;
  }
}
declare module 'vona-module-a-summer' {
  export interface BeanSummer {
    /** @internal */
    get scope(): ScopeModuleASummer;
  }

  export interface BroadcastMemClear {
    /** @internal */
    get scope(): ScopeModuleASummer;
  }

  export interface BroadcastMemDel {
    /** @internal */
    get scope(): ScopeModuleASummer;
  }

  export interface BroadcastMemMultiDel {
    /** @internal */
    get scope(): ScopeModuleASummer;
  }
}
/** beans: end */
/** service: begin */
export * from '../service/localFetch_.js';
export * from '../service/localMem_.js';
export * from '../service/localRedis_.js';

import 'vona';
declare module 'vona' {}
declare module 'vona-module-a-summer' {
  export interface ServiceLocalFetch {
    /** @internal */
    get scope(): ScopeModuleASummer;
  }

  export interface ServiceLocalMem {
    /** @internal */
    get scope(): ScopeModuleASummer;
  }

  export interface ServiceLocalRedis {
    /** @internal */
    get scope(): ScopeModuleASummer;
  }
}
/** service: end */
/** config: begin */
export * from '../config/config.js';
import { config } from '../config/config.js';
/** config: end */
/** scope: begin */
import { BeanScopeBase, Scope, TypeModuleBean, BeanScopeUtil, TypeModuleConfig } from 'vona';

@Scope()
export class ScopeModuleASummer extends BeanScopeBase {}

export interface ScopeModuleASummer {
  _bean: TypeModuleBean;
  util: BeanScopeUtil;
  config: TypeModuleConfig<typeof config>;
}

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
