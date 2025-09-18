/* eslint-disable */
/** scope: begin */
import { BeanScopeBase, type BeanScopeUtil } from 'vona';
import { Scope } from 'vona-module-a-bean';

@Scope()
export class ScopeModuleASerialization extends BeanScopeBase {}

export interface ScopeModuleASerialization {
  util: BeanScopeUtil;
}

import 'vona';
declare module 'vona' {
  export interface IBeanScopeRecord {
    'a-serialization': ScopeModuleASerialization;
  }

  export interface IBeanScopeContainer {
    serialization: ScopeModuleASerialization;
  }
  
  

  
}

/** scope: end */
