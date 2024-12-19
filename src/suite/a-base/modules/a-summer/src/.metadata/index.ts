/** bean: begin */
export * from '../bean/bean.summer.js';
export * from '../bean/bean.summerCacheBase.js';

import 'vona';
declare module 'vona' {}
declare module 'vona-module-a-summer' {
  export interface BeanSummer {
    /** @internal */
    get scope(): ScopeModuleASummer;
  }
}
/** bean: end */
/** bean: begin */
import { BeanSummer } from '../bean/bean.summer.js';
import 'vona';
declare module 'vona' {
  export interface IBeanRecordGlobal {
    summer: BeanSummer;
  }
}
/** bean: end */
/** broadcast: begin */
export * from '../bean/broadcast.memClear.js';
export * from '../bean/broadcast.memDel.js';
export * from '../bean/broadcast.memMultiDel.js';

import { IDecoratorBroadcastOptions } from 'vona-module-a-broadcast';
declare module 'vona-module-a-broadcast' {
  export interface IBroadcastRecord {
    'a-summer:memClear': IDecoratorBroadcastOptions;
    'a-summer:memDel': IDecoratorBroadcastOptions;
    'a-summer:memMultiDel': IDecoratorBroadcastOptions;
  }
}
declare module 'vona-module-a-summer' {
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
/** service: begin */
export * from '../service/localFetch_.js';
export * from '../service/localMem_.js';
export * from '../service/localRedis_.js';

import 'vona';
declare module 'vona' {}
declare module 'vona-module-a-summer' {}
/** service: end */
/** config: begin */
export * from '../config/config.js';
import { config } from '../config/config.js';
/** config: end */
/** scope: begin */
import { BeanScopeBase, TypeModuleBean, BeanScopeUtil, TypeModuleConfig } from 'vona';
import { Scope } from 'vona-module-a-bean';

@Scope()
export class ScopeModuleASummer extends BeanScopeBase {}

export interface ScopeModuleASummer {
  _bean: TypeModuleBean;
  util: BeanScopeUtil;
  config: TypeModuleConfig<typeof config>;
  broadcast: IModuleBroadcast;
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
