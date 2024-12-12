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
declare module 'vona-module-a-status' {
  export interface VersionManager {
    get scope(): ScopeModuleAStatus;
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
declare module 'vona-module-a-status' {}
/** entity: end */
/** model: begin */
export * from '../model/status.js';

import { IDecoratorModelOptions } from 'vona';
declare module 'vona' {
  export interface IModelRecord {
    'a-status:status': IDecoratorModelOptions;
  }
}
declare module 'vona-module-a-status' {
  export interface ModelStatus {
    get scope(): ScopeModuleAStatus;
  }
}
/** model: end */
/** meta: begin */
export * from '../bean/meta.redlock.js';

import 'vona';
declare module 'vona' {
  export interface IMetaRecord {
    'a-status:redlock': never;
  }
}
declare module 'vona-module-a-status' {
  export interface MetaRedlock {
    get scope(): ScopeModuleAStatus;
  }
}
/** meta: end */
/** meta redlock: begin */
import { MetaRedlock } from '../bean/meta.redlock.js';
/** meta redlock: end */
/** entities: begin */
import { EntityStatus } from '../entity/status.js';
export interface IModuleEntity {
  status: EntityStatus;
}
declare module 'vona-module-a-status' {
  export interface EntityStatus {
    column: <K extends keyof Omit<EntityStatus, 'column' | 'columns' | 'table'>>(column: K) => K;
    columns: <K extends keyof Omit<EntityStatus, 'column' | 'columns' | 'table'>>(...columns: K[]) => K[];
  }
}
/** entities: end */
/** models: begin */
import { ModelStatus } from '../model/status.js';
export interface IModuleModel {
  status: ModelStatus;
}
/** models: end */
/** scope: begin */
import { BeanScopeBase, Scope, TypeModuleBean, BeanScopeUtil } from 'vona';

@Scope()
export class ScopeModuleAStatus extends BeanScopeBase {}

export interface ScopeModuleAStatus {
  _bean: TypeModuleBean;
  util: BeanScopeUtil;
  redlock: MetaRedlock;
  model: IModuleModel;
  entity: IModuleEntity;
}

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
