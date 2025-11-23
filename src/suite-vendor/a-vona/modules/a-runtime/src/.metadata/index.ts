/* eslint-disable */
/** scope: begin */
import { BeanScopeBase, type BeanScopeUtil } from 'vona';
import { Scope } from 'vona-module-a-bean';

@Scope()
export class ScopeModuleARuntime extends BeanScopeBase {}

export interface ScopeModuleARuntime {
  util: BeanScopeUtil;
}

import 'vona';
declare module 'vona' {
  export interface IBeanScopeRecord {
    'a-runtime': ScopeModuleARuntime;
  }

  export interface IBeanScopeContainer {
    runtime: ScopeModuleARuntime;
  }
  
  

  

  
}

/** scope: end */
