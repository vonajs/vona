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
/** service: begin */
export * from '../service/localFetch_.js';
export * from '../service/localMem_.js';
export * from '../service/localRedis_.js';

import 'vona';
declare module 'vona-module-a-web' {}
declare module 'vona-module-a-summer' {}
/** service: end */
/** config: begin */
export * from '../config/config.js';
import { config } from '../config/config.js';
/** config: end */
/** scope: begin */
import { BeanScopeBase, BeanScopeUtil, type TypeModuleConfig } from 'vona';
import { Scope } from 'vona-module-a-bean';

@Scope()
export class ScopeModuleASummer extends BeanScopeBase {}

export interface ScopeModuleASummer {
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
