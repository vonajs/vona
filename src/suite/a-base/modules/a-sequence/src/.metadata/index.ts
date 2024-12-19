/** beans: begin */
export * from '../bean/sequence.simple.js';
export * from '../bean/version.manager.js';
import { SequenceSimple } from '../bean/sequence.simple.js';
import { VersionManager } from '../bean/version.manager.js';
import 'vona';
declare module 'vona' {
  export interface IBeanRecordGlobal {}

  export interface IBeanRecordGeneral {
    'a-sequence.sequence.simple': SequenceSimple;
    'a-sequence.version.manager': VersionManager;
  }
}
declare module 'vona-module-a-sequence' {
  export interface SequenceSimple {
    /** @internal */
    get scope(): ScopeModuleASequence;
  }

  export interface VersionManager {
    /** @internal */
    get scope(): ScopeModuleASequence;
  }
}
/** beans: end */
/** entity: begin */
export * from '../entity/sequence.js';

import { IDecoratorEntityOptions } from 'vona-module-a-database';
declare module 'vona-module-a-database' {
  export interface IEntityRecord {
    'a-sequence:sequence': IDecoratorEntityOptions;
  }
}
declare module 'vona-module-a-sequence' {}
/** entity: end */
/** entity: begin */
import { EntitySequence } from '../entity/sequence.js';
export interface IModuleEntity {
  sequence: EntitySequence;
}
/** entity: end */
/** entity: begin */
declare module 'vona-module-a-sequence' {
  export interface EntitySequence {
    column: <K extends keyof Omit<EntitySequence, 'column' | 'columns' | 'table'>>(column: K) => K;
    columns: <K extends keyof Omit<EntitySequence, 'column' | 'columns' | 'table'>>(...columns: K[]) => K[];
  }
}
/** entity: end */
/** bean: begin */
export * from '../bean/bean.sequence.js';

import 'vona';
declare module 'vona' {}
declare module 'vona-module-a-sequence' {
  export interface BeanSequence {
    /** @internal */
    get scope(): ScopeModuleASequence;
  }
}
/** bean: end */
/** bean: begin */
import { BeanSequence } from '../bean/bean.sequence.js';
import 'vona';
declare module 'vona' {
  export interface IBeanRecordGlobal {
    sequence: BeanSequence;
  }
}
/** bean: end */
/** meta: begin */
export * from '../bean/meta.redlock.js';

import 'vona';
declare module 'vona' {
  export interface IMetaRecord {
    'a-sequence:redlock': never;
  }
}
declare module 'vona-module-a-sequence' {
  export interface MetaRedlock {
    /** @internal */
    get scope(): ScopeModuleASequence;
  }
}
/** meta: end */
/** meta redlock: begin */
import { MetaRedlock } from '../bean/meta.redlock.js';
/** meta redlock: end */
/** service: begin */
export * from '../service/sequence.js';

import 'vona';
declare module 'vona' {
  export interface IServiceRecord {
    'a-sequence:sequence': never;
  }
}
declare module 'vona-module-a-sequence' {
  export interface ServiceSequence {
    /** @internal */
    get scope(): ScopeModuleASequence;
  }
}
/** service: end */
/** service: begin */
import { ServiceSequence } from '../service/sequence.js';
export interface IModuleService {
  sequence: ServiceSequence;
}
/** service: end */
/** service: begin */
import 'vona';
declare module 'vona' {
  export interface IBeanRecordGeneral {
    'a-sequence.service.sequence': ServiceSequence;
  }
}
/** service: end */
/** controller: begin */
export * from '../controller/sequence.js';

import { IDecoratorControllerOptions } from 'vona-module-a-web';
declare module 'vona-module-a-web' {
  export interface IControllerRecord {
    'a-sequence:sequence': IDecoratorControllerOptions;
  }
}
declare module 'vona-module-a-sequence' {
  export interface ControllerSequence {
    /** @internal */
    get scope(): ScopeModuleASequence;
  }
}
/** controller: end */
/** scope: begin */
import { BeanScopeBase, Scope, TypeModuleBean, BeanScopeUtil } from 'vona';

@Scope()
export class ScopeModuleASequence extends BeanScopeBase {}

export interface ScopeModuleASequence {
  _bean: TypeModuleBean;
  util: BeanScopeUtil;
  entity: IModuleEntity;
  redlock: MetaRedlock;
  service: IModuleService;
}

import 'vona';
declare module 'vona' {
  export interface IBeanScopeRecord {
    'a-sequence': ScopeModuleASequence;
  }

  export interface IBeanScopeContainer {
    sequence: ScopeModuleASequence;
  }
}

/** scope: end */
