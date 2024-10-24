/** beans: begin */
export * from '../bean/version.manager.js';

import 'vona';
declare module 'vona' {
  export interface IBeanRecord {}
}
/** beans: end */
/** services: begin */
export * from '../service/sessionStore.js';
import { ServiceSessionStore } from '../service/sessionStore.js';
export interface IModuleService {
  sessionStore: ServiceSessionStore;
}
import 'vona';
declare module 'vona' {
  export interface IBeanRecord {
    'a-oauth.service.sessionStore': ServiceSessionStore;
  }
}
/** services: end */
/** scope: begin */
import { BeanScopeBase, Scope, TypeModuleResource } from 'vona';

@Scope()
export class ScopeModuleAOauth extends BeanScopeBase {}

export interface ScopeModuleAOauth extends TypeModuleResource<any, any, any, any, IModuleService, any> {}

import 'vona';
declare module 'vona' {
  export interface IBeanScopeRecord {
    'a-oauth': ScopeModuleAOauth;
  }
}
/** scope: end */
