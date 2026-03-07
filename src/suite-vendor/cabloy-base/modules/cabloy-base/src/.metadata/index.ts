/* eslint-disable */
/** scope: begin */
import { BeanScopeBase, type BeanScopeUtil } from 'vona';
import { Scope } from 'vona-module-a-bean';

@Scope()
export class ScopeModuleCabloyBase extends BeanScopeBase {}

export interface ScopeModuleCabloyBase {
  util: BeanScopeUtil;
}

import 'vona';
declare module 'vona' {
  export interface IBeanScopeRecord {
    'cabloy-base': ScopeModuleCabloyBase;
  }

  export interface IBeanScopeContainer {
    cabloyBase: ScopeModuleCabloyBase;
  }
  
  

  

  
}
/** scope: end */
