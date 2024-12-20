/** guard: begin */
export * from '../bean/guard.user.js';
import { IGuardOptionsUser } from '../bean/guard.user.js';
import 'vona';
declare module 'vona-module-a-aspect' {
  export interface IGuardRecordGlobal {
    'home-base:user': IGuardOptionsUser;
  }
}
declare module 'vona-module-home-base' {
  export interface GuardUser {
    /** @internal */
    get scope(): ScopeModuleHomeBase;
  }
}
/** guard: end */
/** bean: begin */
export * from '../bean/bean.debug.js';

import 'vona';
declare module 'vona' {}
declare module 'vona-module-home-base' {
  export interface BeanDebug {
    /** @internal */
    get scope(): ScopeModuleHomeBase;
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
import { BeanScopeBase, TypeModuleBean, BeanScopeUtil } from 'vona';
import { Scope } from 'vona-module-a-bean';

@Scope()
export class ScopeModuleHomeBase extends BeanScopeBase {}

export interface ScopeModuleHomeBase {
  _bean: TypeModuleBean;
  util: BeanScopeUtil;
}

import 'vona';
declare module 'vona' {
  export interface IBeanScopeRecord {
    'home-base': ScopeModuleHomeBase;
  }

  export interface IBeanScopeContainer {
    homeBase: ScopeModuleHomeBase;
  }
}

/** scope: end */
