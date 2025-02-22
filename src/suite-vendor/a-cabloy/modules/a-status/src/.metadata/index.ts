/** meta redlock: end */
/** scope: begin */
import type { BeanScopeUtil } from 'vona';
/** model: end */
/** meta: begin */
import type { IDecoratorEntityOptions } from 'vona-module-a-database';

import type { IDecoratorModelOptions } from 'vona-module-a-database';
/** meta: end */
/** meta redlock: begin */
import type { MetaRedlock } from '../bean/meta.redlock.ts';

/** entity: end */
/** entity: begin */
import type { EntityStatus } from '../entity/status.ts';
/** model: end */
/** model: begin */
import type { ModelStatus } from '../model/status.ts';
import { BeanScopeBase } from 'vona';
import { Scope } from 'vona-module-a-bean';
import 'vona';

import 'vona';

export * from '../bean/meta.redlock.ts';
declare module 'vona-module-a-database' {
  export interface IEntityRecord {
    'a-status:status': IDecoratorEntityOptions;
  }
}
declare module 'vona-module-a-status' {}
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
export * from '../bean/meta.version.ts';
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
export interface IModuleModel {
  status: ModelStatus;
}
/** entity: begin */
export * from '../entity/status.ts';
/** entity: end */
/** model: begin */
export * from '../model/status.ts';
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

@Scope()
export class ScopeModuleAStatus extends BeanScopeBase {}

export interface ScopeModuleAStatus {
  util: BeanScopeUtil;
  entity: IModuleEntity;
  model: IModuleModel;
  redlock: MetaRedlock;
}

declare module 'vona' {
  export interface IBeanScopeRecord {
    'a-status': ScopeModuleAStatus;
  }

  export interface IBeanScopeContainer {
    status: ScopeModuleAStatus;
  }
}

/** scope: end */
