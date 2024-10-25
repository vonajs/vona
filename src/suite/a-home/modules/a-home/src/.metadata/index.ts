/** beans: begin */
export * from '../bean/version.manager.js';
import { VersionManager } from '../bean/version.manager.js';
import 'vona';
declare module 'vona' {
  export interface IBeanRecordGlobal {}

  export interface IBeanRecordGeneral {
    'a-home.version.manager': VersionManager;
  }
}
/** beans: end */
/** controllers: begin */
export * from '../controller/home.js';
/** controllers: end */
/** services: begin */
export * from '../service/home.js';
import { ServiceHome } from '../service/home.js';
export interface IModuleService {
  home: ServiceHome;
}
import 'vona';
declare module 'vona' {
  export interface IBeanRecordGeneral {
    'a-home.service.home': ServiceHome;
  }
}
/** services: end */
/** scope: begin */
import { BeanScopeBase, Scope, TypeModuleResource } from 'vona';

@Scope()
export class ScopeModuleAHome extends BeanScopeBase {}

export interface ScopeModuleAHome extends TypeModuleResource<any, any, any, any, IModuleService, any> {}

import 'vona';
declare module 'vona' {
  export interface IBeanScopeRecord {
    'a-home': ScopeModuleAHome;
  }
}
/** scope: end */
