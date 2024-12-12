/** beans: begin */
export * from '../bean/bean.sequence.js';
export * from '../bean/sequence.simple.js';
export * from '../bean/version.manager.js';
import { BeanSequence } from '../bean/bean.sequence.js';
import { SequenceSimple } from '../bean/sequence.simple.js';
import { VersionManager } from '../bean/version.manager.js';
import 'vona';
declare module 'vona' {
  export interface IBeanRecordGlobal {
    sequence: BeanSequence;
  }

  export interface IBeanRecordGeneral {
    'a-sequence.sequence.simple': SequenceSimple;
    'a-sequence.version.manager': VersionManager;
  }
}
declare module 'vona-module-a-sequence' {
  export interface BeanSequence {
    get scope(): ScopeModuleASequence;
  }

  export interface SequenceSimple {
    get scope(): ScopeModuleASequence;
  }

  export interface VersionManager {
    get scope(): ScopeModuleASequence;
  }
}
/** beans: end */
/** entity: begin */
export * from '../entity/sequence.js';

import { IDecoratorEntityOptions } from 'vona';
declare module 'vona' {
  export interface IEntityRecord {
    'a-sequence:sequence': IDecoratorEntityOptions;
  }
}
declare module 'vona-module-a-sequence' {}
/** entity: end */
/** controller: begin */
export * from '../controller/sequence.js';

import { IDecoratorControllerOptions } from 'vona';
declare module 'vona' {
  export interface IControllerRecord {
    'a-sequence:sequence': IDecoratorControllerOptions;
  }
}
declare module 'vona-module-a-sequence' {
  export interface ControllerSequence {
    get scope(): ScopeModuleASequence;
  }
}
/** controller: end */
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
    get scope(): ScopeModuleASequence;
  }
}
/** meta: end */
/** meta redlock: begin */
import { MetaRedlock } from '../bean/meta.redlock.js';
/** meta redlock: end */
/** entities: begin */
import { EntitySequence } from '../entity/sequence.js';
export interface IModuleEntity {
  sequence: EntitySequence;
}
declare module 'vona-module-a-sequence' {
  export interface EntitySequence {
    column: <K extends keyof Omit<EntitySequence, 'column' | 'columns' | 'table'>>(column: K) => K;
    columns: <K extends keyof Omit<EntitySequence, 'column' | 'columns' | 'table'>>(...columns: K[]) => K[];
  }
}
/** entities: end */
/** services: begin */
export * from '../service/sequence.js';
import { ServiceSequence } from '../service/sequence.js';
export interface IModuleService {
  sequence: ServiceSequence;
}
import 'vona';
declare module 'vona' {
  export interface IBeanRecordGeneral {
    'a-sequence.service.sequence': ServiceSequence;
  }
}
declare module 'vona-module-a-sequence' {
  export interface ServiceSequence {
    get scope(): ScopeModuleASequence;
  }
}
/** services: end */
/** scope: begin */
import { BeanScopeBase, Scope, TypeModuleBean, BeanScopeUtil } from 'vona';

@Scope()
export class ScopeModuleASequence extends BeanScopeBase {}

export interface ScopeModuleASequence {
  _bean: TypeModuleBean;
  util: BeanScopeUtil;
  redlock: MetaRedlock;
  service: IModuleService;
  entity: IModuleEntity;
  queue: IModulequeue;
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
