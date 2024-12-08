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
import { BeanScopeBase, Scope, TypeModuleBean, BeanScopeUtil } from 'vona';

@Scope()
export class ScopeModuleADebug extends BeanScopeBase {}

export interface ScopeModuleADebug {
  _bean: TypeModuleBean;
  util: BeanScopeUtil;
}

import 'vona';
declare module 'vona' {
  export interface IBeanScopeRecord {
    'a-debug': ScopeModuleADebug;
  }

  export interface IBeanScopeContainer {
    debug: ScopeModuleADebug;
  }
}

/** scope: end */
