// eslint-disable
/** authProvider: begin */
export * from '../bean/authProvider.github.ts';
import type { IAuthProviderOptionsGithub } from '../bean/authProvider.github.ts';
import 'vona-module-a-auth';
declare module 'vona-module-a-auth' {
  
    export interface IAuthProviderRecord {
      'auth-github:github': IAuthProviderOptionsGithub;
    }

  
}
declare module 'vona-module-auth-github' {
  
        export interface AuthProviderGithub {
          /** @internal */
          get scope(): ScopeModuleAuthGithub;
        }

          export interface AuthProviderGithub {
            get $beanFullName(): 'auth-github.authProvider.github';
            get $onionName(): 'auth-github:github';
            get $onionOptions(): IAuthProviderOptionsGithub;
          } 
}
/** authProvider: end */
/** authProvider: begin */
import type { AuthProviderGithub } from '../bean/authProvider.github.ts';
export interface IModuleAuthProvider {
  'github': AuthProviderGithub;
}
/** authProvider: end */
/** scope: begin */
import { BeanScopeBase, type BeanScopeUtil } from 'vona';
import { Scope } from 'vona-module-a-bean';

@Scope()
export class ScopeModuleAuthGithub extends BeanScopeBase {}

export interface ScopeModuleAuthGithub {
  util: BeanScopeUtil;
authProvider: IModuleAuthProvider;
}

import 'vona';
declare module 'vona' {
  export interface IBeanScopeRecord {
    'auth-github': ScopeModuleAuthGithub;
  }

  export interface IBeanScopeContainer {
    authGithub: ScopeModuleAuthGithub;
  }
  
  

  

  
}
/** scope: end */
