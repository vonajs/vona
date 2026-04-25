// eslint-disable
/** scope: begin */
import { BeanScopeBase, type BeanScopeUtil } from 'vona';
import { Scope } from 'vona-module-a-bean';

@Scope()
export class ScopeModuleBasicOpenapi extends BeanScopeBase {}

export interface ScopeModuleBasicOpenapi {
  util: BeanScopeUtil;
}

import 'vona';
declare module 'vona' {
  export interface IBeanScopeRecord {
    'basic-openapi': ScopeModuleBasicOpenapi;
  }

  export interface IBeanScopeContainer {
    basicOpenapi: ScopeModuleBasicOpenapi;
  }
  
  

  

  
}
/** scope: end */
