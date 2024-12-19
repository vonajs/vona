/** service: begin */
export * from '../service/auth.js';

import 'vona';
declare module 'vona' {
  export interface IServiceRecord {
    'a-login:auth': never;
  }
}
declare module 'vona-module-a-login' {
  export interface ServiceAuth {
    /** @internal */
    get scope(): ScopeModuleALogin;
  }
}
/** service: end */
/** service: begin */
import { ServiceAuth } from '../service/auth.js';
export interface IModuleService {
  auth: ServiceAuth;
}
/** service: end */
/** service: begin */
import 'vona';
declare module 'vona' {
  export interface IBeanRecordGeneral {
    'a-login.service.auth': ServiceAuth;
  }
}
/** service: end */
/** controller: begin */
export * from '../controller/auth.js';

import { IDecoratorControllerOptions } from 'vona-module-a-web';
declare module 'vona-module-a-web' {
  export interface IControllerRecord {
    'a-login:auth': IDecoratorControllerOptions;
  }
}
declare module 'vona-module-a-login' {
  export interface ControllerAuth {
    /** @internal */
    get scope(): ScopeModuleALogin;
  }
}
/** controller: end */
/** scope: begin */
import { BeanScopeBase, TypeModuleBean, BeanScopeUtil } from 'vona';
import { Scope } from 'vona-module-a-bean';

@Scope()
export class ScopeModuleALogin extends BeanScopeBase {}

export interface ScopeModuleALogin {
  _bean: TypeModuleBean;
  util: BeanScopeUtil;
  service: IModuleService;
}

import 'vona';
declare module 'vona' {
  export interface IBeanScopeRecord {
    'a-login': ScopeModuleALogin;
  }

  export interface IBeanScopeContainer {
    login: ScopeModuleALogin;
  }
}

/** scope: end */
