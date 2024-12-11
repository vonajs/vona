/** beans: begin */
export * from '../bean/bean.executor.js';
import { BeanExecutor } from '../bean/bean.executor.js';
import 'vona';
declare module 'vona' {
  export interface IBeanRecordGlobal {
    executor: BeanExecutor;
  }

  export interface IBeanRecordGeneral {}
}
/** beans: end */
/** scope: begin */
import { BeanScopeBase, Scope, TypeModuleBean, BeanScopeUtil } from 'vona';

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
