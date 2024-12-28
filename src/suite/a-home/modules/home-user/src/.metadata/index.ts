/** service: begin */
export * from '../service/passportAdapter.js';

import 'vona';
declare module 'vona' {
  export interface IServiceRecord {
    'home-user:passportAdapter': never;
  }
}
declare module 'vona-module-home-user' {
  export interface ServicePassportAdapter {
    /** @internal */
    get scope(): ScopeModuleHomeUser;
  }
}
/** service: end */
/** service: begin */
import { ServicePassportAdapter } from '../service/passportAdapter.js';
export interface IModuleService {
  passportAdapter: ServicePassportAdapter;
}
/** service: end */
/** service: begin */

import 'vona';
declare module 'vona' {
  export interface IBeanRecordGeneral {
    'home-user.service.passportAdapter': ServicePassportAdapter;
  }
}
/** service: end */
/** scope: begin */
import { BeanScopeBase, TypeModuleBean, BeanScopeUtil } from 'vona';
import { Scope } from 'vona-module-a-bean';

@Scope()
export class ScopeModuleHomeUser extends BeanScopeBase {}

export interface ScopeModuleHomeUser {
  _bean: TypeModuleBean;
  util: BeanScopeUtil;
  service: IModuleService;
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
