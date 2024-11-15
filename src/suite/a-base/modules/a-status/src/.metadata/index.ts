/** beans: begin */
export * from '../bean/bean.status.js';
export * from '../bean/version.manager.js';
import { BeanStatus } from '../bean/bean.status.js';

import 'vona';
declare module 'vona' {
  export interface IBeanRecordGlobal {
    status: BeanStatus;
  }
}
/** beans: end */
/** controllers: begin */
export * from '../controller/status.js';
/** controllers: end */
/** entities: begin */
export * from '../entity/status.js';
/** entities: end */
/** models: begin */
export * from '../model/status.js';
import { ModelStatus } from '../model/status.js';
export interface IModuleModel {
  status: ModelStatus;
}
/** models: end */
/** services: begin */
export * from '../service/status.js';
import { ServiceStatus } from '../service/status.js';
export interface IModuleService {
  status: ServiceStatus;
}
import 'vona';
declare module 'vona' {
  export interface IBeanRecordGeneral {
    'a-status.service.status': ServiceStatus;
  }
}
/** services: end */
/** scope: begin */
import { BeanScopeBase, Scope, TypeModuleResource } from 'vona';

@Scope()
export class ScopeModuleAStatus extends BeanScopeBase {}

export interface ScopeModuleAStatus
  extends TypeModuleResource<never, never, never, never, IModuleService, IModuleModel> {}

import 'vona';
declare module 'vona' {
  export interface IBeanScopeRecord {
    'a-status': ScopeModuleAStatus;
  }

  export interface IBeanScopeContainer {
    status: ScopeModuleAStatus;
  }
}
/** scope: end */
