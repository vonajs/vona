/** beans: begin */
export * from '../bean/bean.debug.js';
export * from '../bean/version.manager.js';
import { BeanDebug } from '../bean/bean.debug.js';
import 'vona';
declare module 'vona' {
  export interface IBeanRecord {
    debug: BeanDebug;
  }
}
/** beans: end */
/** scope: begin */
import { BeanScopeBase, Scope, TypeModuleResource } from 'vona';

@Scope()
export class ScopeModuleADebug extends BeanScopeBase {}

export interface ScopeModuleADebug extends TypeModuleResource<any, any, any, any, any, any> {}

import 'vona';
declare module 'vona' {
  export interface IBeanScopeRecord {
    'a-debug': ScopeModuleADebug;
  }
}
/** scope: end */
