/* eslint-disable */
import type { TypeControllerOptionsActions } from 'vona-module-a-openapi';
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
/** controller: begin */
export * from '../controller/mock.ts';
import type { IControllerOptionsMock } from '../controller/mock.ts';
import 'vona-module-a-web';
declare module 'vona-module-a-web' {
  
    export interface IControllerRecord {
      'auth-github:mock': IControllerOptionsMock;
    }

  
}
declare module 'vona-module-auth-github' {
  
        export interface ControllerMock {
          /** @internal */
          get scope(): ScopeModuleAuthGithub;
        }

          export interface ControllerMock {
            get $beanFullName(): 'auth-github.controller.mock';
            get $onionName(): 'auth-github:mock';
            get $onionOptions(): IControllerOptionsMock;
          } 
}
/** controller: end */
/** controller: begin */
// @ts-ignore ignore
import type { ControllerMock } from '../controller/mock.ts';
declare module 'vona-module-auth-github' {
  
    export interface IControllerOptionsMock {
      actions?: TypeControllerOptionsActions<ControllerMock>;
    }
}
declare module 'vona-module-a-web' {
  export interface IApiPathGetRecord{
        '/auth/github/mock/authorize': undefined;
    }

}

/** controller: end */
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
