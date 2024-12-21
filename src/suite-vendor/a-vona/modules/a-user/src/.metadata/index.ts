/** guard: begin */
export * from '../bean/guard.passport.js';
import { IGuardOptionsPassport } from '../bean/guard.passport.js';
import 'vona';
declare module 'vona-module-a-aspect' {
  export interface IGuardRecordGlobal {
    'a-user:passport': IGuardOptionsPassport;
  }
}
declare module 'vona-module-a-user' {
  export interface GuardPassport {
    /** @internal */
    get scope(): ScopeModuleAUser;
  }
}
/** guard: end */
/** scope: begin */
import { BeanScopeBase, TypeModuleBean, BeanScopeUtil } from 'vona';
import { Scope } from 'vona-module-a-bean';

@Scope()
export class ScopeModuleAUser extends BeanScopeBase {}

export interface ScopeModuleAUser {
  _bean: TypeModuleBean;
  util: BeanScopeUtil;
}

import 'vona';
declare module 'vona' {
  export interface IBeanScopeRecord {
    'a-user': ScopeModuleAUser;
  }

  export interface IBeanScopeContainer {
    user: ScopeModuleAUser;
  }
}

/** scope: end */
