/* eslint-disable */
/** scope: begin */
import { BeanScopeBase, type BeanScopeUtil } from 'vona';
import { Scope } from 'vona-module-a-bean';

@Scope()
export class ScopeModuleAOpenapiutils extends BeanScopeBase {}

export interface ScopeModuleAOpenapiutils {
  util: BeanScopeUtil;
}

import 'vona';
declare module 'vona' {
  export interface IBeanScopeRecord {
    'a-openapiutils': ScopeModuleAOpenapiutils;
  }

  export interface IBeanScopeContainer {
    openapiutils: ScopeModuleAOpenapiutils;
  }
  
  

  
}

/** scope: end */
