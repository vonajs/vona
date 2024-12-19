/** beans: begin */
export * from '../bean/version.manager.js';
import { VersionManager } from '../bean/version.manager.js';
import 'vona';
declare module 'vona' {
  export interface IBeanRecordGlobal {}

  export interface IBeanRecordGeneral {
    'a-debug.version.manager': VersionManager;
  }
}
declare module 'vona-module-a-debug' {
  export interface VersionManager {
    /** @internal */
    get scope(): ScopeModuleADebug;
  }
}
/** beans: end */
/** bean: begin */
export * from '../bean/bean.debug.js';

import 'vona';
declare module 'vona' {}
declare module 'vona-module-a-debug' {
  export interface BeanDebug {
    /** @internal */
    get scope(): ScopeModuleADebug;
  }
}
/** bean: end */
/** bean: begin */
import { BeanDebug } from '../bean/bean.debug.js';
import 'vona';
declare module 'vona' {
  export interface IBeanRecordGlobal {
    debug: BeanDebug;
  }
}
/** bean: end */
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
