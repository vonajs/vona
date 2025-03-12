import type { BeanScopeUtil } from 'vona';
/** authProvider: begin */
import type { IDecoratorAuthProviderOptions } from 'vona-module-a-auth';
/** authProvider: end */
/** authProvider: begin */
import type { AuthProviderSimple } from '../bean/authProvider.simple.ts';
/** authProvider: end */
/** scope: begin */
import { BeanScopeBase } from 'vona';
import { Scope } from 'vona-module-a-bean';

import 'vona';

export * from '../bean/authProvider.simple.ts';
declare module 'vona-module-a-auth' {

  export interface IAuthProviderRecord {
    'a-authsimple:simple': IDecoratorAuthProviderOptions;
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

@Scope()
export class ScopeModuleAAuthsimple extends BeanScopeBase {}

export interface ScopeModuleAAuthsimple {
  util: BeanScopeUtil;
  authProvider: IModuleAuthProvider;
}
declare module 'vona' {
  export interface IBeanScopeRecord {
    'a-authsimple': ScopeModuleAAuthsimple;
  }

  export interface IBeanScopeContainer {
    authsimple: ScopeModuleAAuthsimple;
  }

}

/** scope: end */
