/** bean: end */
/** scope: begin */
import type { BeanScopeUtil } from 'vona';
/** bean: end */
/** bean: begin */
import type { BeanDebug } from '../bean/bean.debug.ts';
import { BeanScopeBase } from 'vona';
import { Scope } from 'vona-module-a-bean';
/** bean: begin */
import 'vona';
import 'vona';

import 'vona';

export * from '../bean/bean.debug.ts';
declare module 'vona' {}
declare module 'vona-module-home-base' {
  export interface BeanDebug {
    /** @internal */
    get scope(): ScopeModuleHomeBase;
  }
}
declare module 'vona' {
  export interface IBeanRecordGlobal {
    debug: BeanDebug;
  }
}

@Scope()
export class ScopeModuleHomeBase extends BeanScopeBase {}

export interface ScopeModuleHomeBase {
  util: BeanScopeUtil;
}
declare module 'vona' {
  export interface IBeanScopeRecord {
    'home-base': ScopeModuleHomeBase;
  }

  export interface IBeanScopeContainer {
    homeBase: ScopeModuleHomeBase;
  }
}

/** scope: end */
