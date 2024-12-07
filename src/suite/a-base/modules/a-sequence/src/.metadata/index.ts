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
/** beans: end */
/** entity: begin */
export * from '../entity/sequence.js';

import { IDecoratorEntityOptions } from 'vona';
declare module 'vona' {
  export interface IEntityRecord {
    'a-sequence:sequence': IDecoratorEntityOptions;
  }
}
/** entity: end */
/** controller: begin */
export * from '../controller/sequence.js';

import { IDecoratorControllerOptions } from 'vona';
declare module 'vona' {
  export interface IControllerRecord {
    'a-sequence:sequence': IDecoratorControllerOptions;
  }
}
/** controller: end */
/** entities: begin */
import { EntitySequence } from '../entity/sequence.js';
export interface IModuleEntity {
  sequence: EntitySequence;
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
/** services: end */
/** scope: begin */
import { BeanScopeBase, Scope, TypeModuleResource } from 'vona';

@Scope()
export class ScopeModuleASequence extends BeanScopeBase {}

export interface ScopeModuleASequence
  extends TypeModuleResource<never, never, never, never, never, IModuleService, never, IModuleEntity, never> {}

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
