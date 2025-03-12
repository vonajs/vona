import type { BeanScopeUtil, TypeModuleConfig } from 'vona';
/** authProvider: begin */
import type { IAuthProviderOptionsSimple } from '../bean/authProvider.simple.ts';
/** authProvider: end */
/** authProvider: begin */
import type { AuthProviderSimple } from '../bean/authProvider.simple.ts';

/** bean: end */
/** bean: begin */
import type { BeanAuthSimple } from '../bean/bean.authSimple.ts';
import type { config } from '../config/config.ts';
/** service: end */
/** service: begin */
import type { ServiceSimple } from '../service/simple.ts';
/** config: end */
/** scope: begin */
import { BeanScopeBase } from 'vona';

import { Scope } from 'vona-module-a-bean';
import 'vona';
/** service: end */
/** service: begin */

import 'vona';
import 'vona';
import 'vona';
import 'vona';

import 'vona';

export * from '../bean/authProvider.simple.ts';
declare module 'vona-module-a-auth' {

  export interface IAuthProviderRecord {
    'a-authsimple:simple': IAuthProviderOptionsSimple;
  }

}
declare module 'vona-module-a-authsimple' {

  export interface AuthProviderSimple {
    /** @internal */
    get scope(): ScopeModuleAAuthsimple;
  }
}
export interface IModuleAuthProvider {
  simple: AuthProviderSimple;
}
/** authProvider: end */
/** bean: begin */
export * from '../bean/bean.authSimple.ts';
declare module 'vona' {

}
declare module 'vona-module-a-authsimple' {

  export interface BeanAuthSimple {
    /** @internal */
    get scope(): ScopeModuleAAuthsimple;
  }
}
declare module 'vona' {
  export interface IBeanRecordGlobal {
    authSimple: BeanAuthSimple;
  }
}
/** service: end */
/** config: begin */
export * from '../config/config.ts';
declare module 'vona-module-a-web' {

  export interface IServiceRecord {
    'a-authsimple:simple': never;
  }

}
declare module 'vona-module-a-authsimple' {

  export interface ServiceSimple {
    /** @internal */
    get scope(): ScopeModuleAAuthsimple;
  }
}
export interface IModuleService {
  simple: ServiceSimple;
}
declare module 'vona' {
  export interface IBeanRecordGeneral {
    'a-authsimple.service.simple': ServiceSimple;
  }
}
/** bean: end */
/** service: begin */
export * from '../service/simple.ts';

@Scope()
export class ScopeModuleAAuthsimple extends BeanScopeBase {}

export interface ScopeModuleAAuthsimple {
  util: BeanScopeUtil;
  config: TypeModuleConfig<typeof config>;
  authProvider: IModuleAuthProvider;
  service: IModuleService;
}
declare module 'vona' {
  export interface IBeanScopeRecord {
    'a-authsimple': ScopeModuleAAuthsimple;
  }

  export interface IBeanScopeContainer {
    authsimple: ScopeModuleAAuthsimple;
  }

  export interface IBeanScopeConfig {
    'a-authsimple': ReturnType<typeof config>;
  }

}

/** scope: end */
