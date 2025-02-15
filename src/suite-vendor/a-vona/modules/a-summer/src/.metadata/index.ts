/** config: end */
/** scope: begin */
import type { BeanScopeUtil } from 'vona';
import type { TypeModuleConfig } from 'vona';
/** bean: end */
/** bean: begin */
import type { BeanSummer } from '../bean/bean.summer.js';

import type { config } from '../config/config.js';
import { BeanScopeBase } from 'vona';
import { Scope } from 'vona-module-a-bean';
/** bean: begin */
import 'vona';
import 'vona';
import 'vona';

import 'vona';

export * from '../bean/bean.summer.js';
export * from '../bean/bean.summerCacheBase.js';
declare module 'vona' {}
declare module 'vona-module-a-summer' {
  export interface BeanSummer {
    /** @internal */
    get scope(): ScopeModuleASummer;
  }
}
declare module 'vona' {
  export interface IBeanRecordGlobal {
    summer: BeanSummer;
  }
}
/** service: end */
/** config: begin */
export * from '../config/config.js';
/** bean: end */
/** service: begin */
export * from '../service/localFetch_.js';
export * from '../service/localMem_.js';
declare module 'vona-module-a-web' {}
declare module 'vona-module-a-summer' {}
export * from '../service/localRedis_.js';

@Scope()
export class ScopeModuleASummer extends BeanScopeBase {}

export interface ScopeModuleASummer {
  util: BeanScopeUtil;
  config: TypeModuleConfig<typeof config>;
}
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
