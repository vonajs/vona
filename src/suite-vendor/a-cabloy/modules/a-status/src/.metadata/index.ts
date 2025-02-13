/** entity: begin */
export * from '../entity/status.js';

import { type IDecoratorEntityOptions } from 'vona-module-a-database';
declare module 'vona-module-a-database' {
  export interface IEntityRecord {
    'a-status:status': IDecoratorEntityOptions;
  }
}
declare module 'vona-module-a-status' {}
/** entity: end */
/** entity: begin */
import { EntityStatus } from '../entity/status.js';
export interface IModuleEntity {
  status: EntityStatus;
}
/** entity: end */
/** entity: begin */
declare module 'vona-module-a-status' {
  export interface EntityStatus {
    column: <K extends keyof Omit<EntityStatus, 'column' | 'columns' | 'table'>>(column: K) => K;
    columns: <K extends keyof Omit<EntityStatus, 'column' | 'columns' | 'table'>>(...columns: K[]) => K[];
  }
}
/** entity: end */
/** model: begin */
export * from '../model/status.js';

import { type IDecoratorModelOptions } from 'vona-module-a-database';
declare module 'vona-module-a-database' {
  export interface IModelRecord {
    'a-status:status': IDecoratorModelOptions;
  }
}
declare module 'vona-module-a-status' {
  export interface ModelStatus {
    /** @internal */
    get scope(): ScopeModuleAStatus;
  }
}
/** model: end */
/** model: begin */
import { ModelStatus } from '../model/status.js';
export interface IModuleModel {
  status: ModelStatus;
}
/** model: end */
/** meta: begin */
export * from '../bean/meta.redlock.js';
export * from '../bean/meta.version.js';

import 'vona';
declare module 'vona' {
  export interface IMetaRecord {
    'a-status:redlock': never;
    'a-status:version': never;
  }
}
declare module 'vona-module-a-status' {
  export interface MetaRedlock {
    /** @internal */
    get scope(): ScopeModuleAStatus;
  }

  export interface MetaVersion {
    /** @internal */
    get scope(): ScopeModuleAStatus;
  }
}
/** meta: end */
/** meta redlock: begin */
import { MetaRedlock } from '../bean/meta.redlock.js';
/** meta redlock: end */
/** scope: begin */
import { BeanScopeBase, BeanScopeUtil } from 'vona';
import { Scope } from 'vona-module-a-bean';

@Scope()
export class ScopeModuleAStatus extends BeanScopeBase {}

export interface ScopeModuleAStatus {
  util: BeanScopeUtil;
  entity: IModuleEntity;
  model: IModuleModel;
  redlock: MetaRedlock;
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
