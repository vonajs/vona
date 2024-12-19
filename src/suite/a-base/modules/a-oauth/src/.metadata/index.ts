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
    /** @internal */
    get scope(): ScopeModuleAOauth;
  }
}
/** beans: end */
/** service: begin */
export * from '../service/sessionStore.js';

import 'vona';
declare module 'vona' {
  export interface IServiceRecord {
    'a-oauth:sessionStore': never;
  }
}
declare module 'vona-module-a-oauth' {
  export interface ServiceSessionStore {
    /** @internal */
    get scope(): ScopeModuleAOauth;
  }
}
/** service: end */
/** service: begin */
import { ServiceSessionStore } from '../service/sessionStore.js';
export interface IModuleService {
  sessionStore: ServiceSessionStore;
}
/** service: end */
/** service: begin */
import 'vona';
declare module 'vona' {
  export interface IBeanRecordGeneral {
    'a-oauth.service.sessionStore': ServiceSessionStore;
  }
}
/** service: end */
/** main: begin */
export * from '../main.js';
/** main: end */
/** scope: begin */
import { BeanScopeBase, TypeModuleBean, BeanScopeUtil } from 'vona';
import { Scope } from 'vona-module-a-bean';

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
