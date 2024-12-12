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
    get scope(): ScopeModuleASummer;
  }

  export interface BroadcastMemClear {
    get scope(): ScopeModuleASummer;
  }

  export interface BroadcastMemDel {
    get scope(): ScopeModuleASummer;
  }

  export interface BroadcastMemMultiDel {
    get scope(): ScopeModuleASummer;
  }
}
/** beans: end */
/** services: begin */
export * from '../service/localFetch_.js';
export * from '../service/localMem_.js';
export * from '../service/localRedis_.js';

export interface IModuleService {}
import 'vona';
declare module 'vona' {
  export interface IBeanRecordGeneral {}
}
declare module 'vona-module-a-summer' {
  export interface ServiceLocalFetch {
    get scope(): ScopeModuleASummer;
  }

  export interface ServiceLocalMem {
    get scope(): ScopeModuleASummer;
  }

  export interface ServiceLocalRedis {
    get scope(): ScopeModuleASummer;
  }
}
/** services: end */
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
  service: IModuleService;
  atom: IModuleatom;
  middleware: IModulemiddleware;
  guard: IModuleguard;
  interceptor: IModuleinterceptor;
  pipe: IModulepipe;
  filter: IModulefilter;
  socketConnection: IModulesocketConnection;
  socketPacket: IModulesocketPacket;
  aop: IModuleaop;
  entity: IModuleentity;
  model: IModulemodel;
  controller: IModulecontroller;
  meta: IModulemeta;
  summerCache: IModulesummerCache;
  startup: IModulestartup;
  queue: IModulequeue;
  schedule: IModuleschedule;
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
