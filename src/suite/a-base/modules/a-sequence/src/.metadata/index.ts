/** beans: begin */
export * from '../bean/bean.sequence.js';
export * from '../bean/sequence.simple.js';
export * from '../bean/version.manager.js';
import { BeanSequence } from '../bean/bean.sequence.js';
import 'vona';
declare module 'vona' {
  export interface IBeanRecord {
    sequence: BeanSequence;
  }
}
/** beans: end */
/** controllers: begin */
export * from '../controller/sequence.js';
/** controllers: end */
/** entities: begin */
export * from '../entity/sequence.js';
/** entities: end */
/** services: begin */
export * from '../service/sequence.js';
import { ServiceSequence } from '../service/sequence.js';
export interface IModuleService {
  sequence: ServiceSequence;
}
import 'vona';
declare module 'vona' {
  export interface IBeanRecord {
    'a-sequence.service.sequence': ServiceSequence;
  }
}
/** services: end */
/** scope: begin */
import { BeanScopeBase, Scope, TypeModuleResource } from 'vona';

@Scope()
export class ScopeModuleASequence extends BeanScopeBase {}

export interface ScopeModuleASequence extends TypeModuleResource<any, any, any, any, IModuleService, any> {}

import 'vona';
declare module 'vona' {
  export interface IBeanScopeRecord {
    'a-sequence': ScopeModuleASequence;
  }
}
/** scope: end */
