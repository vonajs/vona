import type { BeanScopeUtil } from 'vona';
/** bean: end */
/** bean: begin */
import type { BeanExecutor } from '../bean/bean.executor.ts';
/** bean: end */
/** scope: begin */
import { BeanScopeBase } from 'vona';
import { Scope } from 'vona-module-a-bean';
/** bean: begin */
import 'vona';
import 'vona';

import 'vona';

export * from '../bean/bean.executor.ts';
declare module 'vona' {

}
declare module 'vona-module-a-executor' {

  export interface BeanExecutor {
    /** @internal */
    get scope(): ScopeModuleAExecutor;
  }
}
declare module 'vona' {
  export interface IBeanRecordGlobal {
    executor: BeanExecutor;
  }
}

@Scope()
export class ScopeModuleAExecutor extends BeanScopeBase {}

export interface ScopeModuleAExecutor {
  util: BeanScopeUtil;
}
declare module 'vona' {
  export interface IBeanScopeRecord {
    'a-executor': ScopeModuleAExecutor;
  }

  export interface IBeanScopeContainer {
    executor: ScopeModuleAExecutor;
  }

}

/** scope: end */
