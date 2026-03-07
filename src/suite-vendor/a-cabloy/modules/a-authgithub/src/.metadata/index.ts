/* eslint-disable */
/** authProvider: begin */
export * from '../bean/authProvider.github.ts';
import type { IAuthProviderOptionsGithub } from '../bean/authProvider.github.ts';
import 'vona-module-a-auth';
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

          export interface AuthProviderGithub {
            get $beanFullName(): 'a-authgithub.authProvider.github';
            get $onionName(): 'a-authgithub:github';
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
export class ScopeModuleAAuthgithub extends BeanScopeBase {}

export interface ScopeModuleAAuthgithub {
  util: BeanScopeUtil;
authProvider: IModuleAuthProvider;
}

import 'vona';
declare module 'vona' {
  export interface IBeanScopeRecord {
    'a-authgithub': ScopeModuleAAuthgithub;
  }

  export interface IBeanScopeContainer {
    authgithub: ScopeModuleAAuthgithub;
  }
  
  

  

  
}
/** scope: end */
