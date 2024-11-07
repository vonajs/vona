/** controllers: begin */
export * from '../controller/auth.js';
import { ControllerAuth } from '../controller/auth.js';
export const controllers = {
  auth: ControllerAuth,
};
/** controllers: end */
/** services: begin */
export * from '../service/auth.js';
import { ServiceAuth } from '../service/auth.js';
export interface IModuleService {
  auth: ServiceAuth;
}
import 'vona';
declare module 'vona' {
  export interface IBeanRecordGeneral {
    'a-login.service.auth': ServiceAuth;
  }
}
/** services: end */
/** scope: begin */
import { BeanScopeBase, Scope, TypeModuleResource } from 'vona';

@Scope()
export class ScopeModuleALogin extends BeanScopeBase {}

export interface ScopeModuleALogin extends TypeModuleResource<any, any, any, any, IModuleService, any> {}

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
