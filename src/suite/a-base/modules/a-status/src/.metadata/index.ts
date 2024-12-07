/** beans: begin */
export * from '../bean/bean.status.js';
export * from '../bean/version.manager.js';
import { BeanStatus } from '../bean/bean.status.js';
import { VersionManager } from '../bean/version.manager.js';
import 'vona';
declare module 'vona' {
  export interface IBeanRecordGlobal {
    status: BeanStatus;
  }

  export interface IBeanRecordGeneral {
    'a-status.version.manager': VersionManager;
  }
}
/** beans: end */
/** entity: begin */
export * from '../entity/status.js';

import { IDecoratorEntityOptions } from 'vona';
declare module 'vona' {
  export interface IEntityRecord {
    'a-status:status': IDecoratorEntityOptions;
  }
}
/** entity: end */
/** model: begin */
export * from '../model/status.js';

import { IDecoratorModelOptions } from 'vona';
declare module 'vona' {
  export interface IModelRecord {
    'a-status:status': IDecoratorModelOptions;
  }
}
/** model: end */
/** controller: begin */
export * from '../controller/status.js';

import { IDecoratorControllerOptions } from 'vona';
declare module 'vona' {
  export interface IControllerRecord {
    'a-status:status': IDecoratorControllerOptions;
  }
}
/** controller: end */
/** entities: begin */
import { EntityStatus } from '../entity/status.js';
export interface IModuleEntity {
  status: EntityStatus;
}
/** entities: end */
/** models: begin */
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
  extends TypeModuleResource<never, never, never, never, never, IModuleService, IModuleModel, IModuleEntity, never> {}

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
