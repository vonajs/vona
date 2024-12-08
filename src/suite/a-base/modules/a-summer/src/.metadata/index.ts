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
