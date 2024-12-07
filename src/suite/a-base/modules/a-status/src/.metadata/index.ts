/** beans: begin */
export * from '../bean/version.manager.js';
import { VersionManager } from '../bean/version.manager.js';
import 'vona';
declare module 'vona' {
  export interface IBeanRecordGlobal {}

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
/** scope: begin */
import { BeanScopeBase, Scope, TypeModuleResource } from 'vona';

@Scope()
export class ScopeModuleAStatus extends BeanScopeBase {}

export interface ScopeModuleAStatus
  extends TypeModuleResource<never, never, never, never, never, never, IModuleModel, IModuleEntity, never> {}

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
