import type { BeanScopeUtil } from 'vona';
/** bean: end */
/** bean: begin */
import type { BeanAuthInner } from '../bean/bean.authInner.ts';
/** service: end */
/** service: begin */
import type { ServiceAuthenticator } from '../service/authenticator.ts';
/** service: end */
/** scope: begin */
import { BeanScopeBase } from 'vona';

import { Scope } from 'vona-module-a-bean';
/** bean: begin */
import 'vona';
/** service: end */
/** service: begin */

import 'vona';
import 'vona';
import 'vona';

import 'vona';

export * from '../bean/bean.authInner.ts';
declare module 'vona' {

}
declare module 'vona-module-a-auth' {

  export interface BeanAuthInner {
    /** @internal */
    get scope(): ScopeModuleAAuth;
  }
}
declare module 'vona' {
  export interface IBeanRecordGlobal {
    authInner: BeanAuthInner;
  }
}
/** bean: end */
/** service: begin */
export * from '../service/authenticator.ts';
declare module 'vona-module-a-web' {

  export interface IServiceRecord {
    'a-auth:authenticator': never;
  }

}
declare module 'vona-module-a-auth' {

  export interface ServiceAuthenticator {
    /** @internal */
    get scope(): ScopeModuleAAuth;
  }
}
export interface IModuleService {
  authenticator: ServiceAuthenticator;
}
declare module 'vona' {
  export interface IBeanRecordGeneral {
    'a-auth.service.authenticator': ServiceAuthenticator;
  }
}

@Scope()
export class ScopeModuleAAuth extends BeanScopeBase {}

export interface ScopeModuleAAuth {
  util: BeanScopeUtil;
  service: IModuleService;
}
declare module 'vona' {
  export interface IBeanScopeRecord {
    'a-auth': ScopeModuleAAuth;
  }

  export interface IBeanScopeContainer {
    auth: ScopeModuleAAuth;
  }

}

/** scope: end */
