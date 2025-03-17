import type { BeanScopeUtil } from 'vona';
/** authProvider: begin */
import type { IAuthProviderOptionsGithub } from '../bean/authProvider.github.ts';
/** authProvider: end */
/** authProvider: begin */
import type { AuthProviderGithub } from '../bean/authProvider.github.ts';
/** authProvider: end */
/** scope: begin */
import { BeanScopeBase } from 'vona';
import { Scope } from 'vona-module-a-bean';
import 'vona';

import 'vona';

export * from '../bean/authProvider.github.ts';
declare module 'vona-module-a-auth' {

  export interface IAuthProviderRecord {
    'a-authgithub:github': IAuthProviderOptionsGithub;
  }

}
declare module 'vona-module-a-authgithub' {

  export interface AuthProviderGithub {
    /** @internal */
    get scope(): ScopeModuleAAuthgithub;
  }
}
export interface IModuleAuthProvider {
  github: AuthProviderGithub;
}

@Scope()
export class ScopeModuleAAuthgithub extends BeanScopeBase {}

export interface ScopeModuleAAuthgithub {
  util: BeanScopeUtil;
  authProvider: IModuleAuthProvider;
}
declare module 'vona' {
  export interface IBeanScopeRecord {
    'a-authgithub': ScopeModuleAAuthgithub;
  }

  export interface IBeanScopeContainer {
    authgithub: ScopeModuleAAuthgithub;
  }

}

/** scope: end */
