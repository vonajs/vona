/** config: end */
/** scope: begin */
import type { BeanScopeUtil } from 'vona';
import type { TypeModuleConfig } from 'vona';
/** bean: end */
/** bean: begin */
import type { BeanSummer } from '../bean/bean.summer.ts';

import type { config } from '../config/config.ts';
import { BeanScopeBase } from 'vona';
import { Scope } from 'vona-module-a-bean';
/** bean: begin */
import 'vona';
import 'vona';
import 'vona';

import 'vona';

export * from '../bean/bean.summer.ts';
export * from '../bean/bean.summerCacheBase.ts';
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
export * from '../config/config.ts';
/** bean: end */
/** service: begin */
export * from '../service/localFetch_.ts';
export * from '../service/localMem_.ts';
declare module 'vona-module-a-web' {}
declare module 'vona-module-a-summer' {}
export * from '../service/localRedis_.ts';

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
