/** bean: begin */
export * from '../bean/bean.user.js';

import 'vona';
declare module 'vona' {}
declare module 'vona-module-home-user' {
  export interface BeanUser {
    /** @internal */
    get scope(): ScopeModuleHomeUser;
  }
}
/** bean: end */
/** bean: begin */
import { BeanUser } from '../bean/bean.user.js';
import 'vona';
declare module 'vona' {
  export interface IBeanRecordGlobal {
    user: BeanUser;
  }
}
/** bean: end */
/** scope: begin */
import { BeanScopeBase, TypeModuleBean, BeanScopeUtil } from 'vona';
import { Scope } from 'vona-module-a-bean';

@Scope()
export class ScopeModuleHomeUser extends BeanScopeBase {}

export interface ScopeModuleHomeUser {
  _bean: TypeModuleBean;
  util: BeanScopeUtil;
}

import 'vona';
declare module 'vona' {
  export interface IBeanScopeRecord {
    'home-user': ScopeModuleHomeUser;
  }

  export interface IBeanScopeContainer {
    homeUser: ScopeModuleHomeUser;
  }
}

/** scope: end */
