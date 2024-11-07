/** beans: begin */
export * from '../bean/bean.debug.js';
export * from '../bean/version.manager.js';
import { BeanDebug } from '../bean/bean.debug.js';
import { VersionManager } from '../bean/version.manager.js';
import 'vona';
declare module 'vona' {
  export interface IBeanRecordGlobal {
    debug: BeanDebug;
  }

  export interface IBeanRecordGeneral {
    'a-debug.version.manager': VersionManager;
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

  export interface BeanScopeContainer {
    debug: ScopeModuleADebug;
  }
}
/** scope: end */
