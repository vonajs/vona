/* eslint-disable */
/** scope: begin */
import { BeanScopeBase, type BeanScopeUtil } from 'vona';
import { Scope } from 'vona-module-a-bean';

@Scope()
export class ScopeModuleAActions extends BeanScopeBase {}

export interface ScopeModuleAActions {
  util: BeanScopeUtil;
}

import 'vona';
declare module 'vona' {
  export interface IBeanScopeRecord {
    'a-actions': ScopeModuleAActions;
  }

  export interface IBeanScopeContainer {
    actions: ScopeModuleAActions;
  }
  
  

  

  
}
/** scope: end */
