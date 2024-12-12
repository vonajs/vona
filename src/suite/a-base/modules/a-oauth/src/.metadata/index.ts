/** beans: begin */
export * from '../bean/version.manager.js';
import { VersionManager } from '../bean/version.manager.js';
import 'vona';
declare module 'vona' {
  export interface IBeanRecordGlobal {}

  export interface IBeanRecordGeneral {
    'a-oauth.version.manager': VersionManager;
  }
}
declare module 'vona-module-a-oauth' {
  export interface VersionManager {
    get scope(): ScopeModuleAOauth;
  }
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
  export interface IBeanRecordGeneral {
    'a-oauth.service.sessionStore': ServiceSessionStore;
  }
}
/** services: end */
/** main: begin */
export * from '../main.js';
/** main: end */
/** scope: begin */
import { BeanScopeBase, Scope, TypeModuleBean, BeanScopeUtil } from 'vona';

@Scope()
export class ScopeModuleAOauth extends BeanScopeBase {}

export interface ScopeModuleAOauth {
  _bean: TypeModuleBean;
  util: BeanScopeUtil;
  service: IModuleService;
}

import 'vona';
declare module 'vona' {
  export interface IBeanScopeRecord {
    'a-oauth': ScopeModuleAOauth;
  }

  export interface IBeanScopeContainer {
    oauth: ScopeModuleAOauth;
  }
}

/** scope: end */
