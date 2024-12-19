/** bean: begin */
export * from '../bean/bean.executor.js';

import 'vona';
declare module 'vona' {}
declare module 'vona-module-a-executor' {
  export interface BeanExecutor {
    /** @internal */
    get scope(): ScopeModuleAExecutor;
  }
}
/** bean: end */
/** bean: begin */
import { BeanExecutor } from '../bean/bean.executor.js';
import 'vona';
declare module 'vona' {
  export interface IBeanRecordGlobal {
    executor: BeanExecutor;
  }
}
/** bean: end */
/** scope: begin */
import { BeanScopeBase, TypeModuleBean, BeanScopeUtil } from 'vona';
import { Scope } from 'vona-module-a-bean';

@Scope()
export class ScopeModuleAExecutor extends BeanScopeBase {}

export interface ScopeModuleAExecutor {
  _bean: TypeModuleBean;
  util: BeanScopeUtil;
}

import 'vona';
declare module 'vona' {
  export interface IBeanScopeRecord {
    'a-executor': ScopeModuleAExecutor;
  }

  export interface IBeanScopeContainer {
    executor: ScopeModuleAExecutor;
  }
}

/** scope: end */
