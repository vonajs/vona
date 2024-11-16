/** pipes: begin */
export * from '../bean/pipe.validation.js';
import { IPipeOptionsValidation } from '../bean/pipe.validation.js';
import 'vona';
declare module 'vona' {
  export interface IPipeRecordLocal {
    'a-validator:validation': IPipeOptionsValidation;
  }
}
/** pipes: end */
/** scope: begin */
import { BeanScopeBase, Scope, TypeModuleResource } from 'vona';

@Scope()
export class ScopeModuleAValidator extends BeanScopeBase {}

export interface ScopeModuleAValidator extends TypeModuleResource<never, never, never, never, never, never> {}

import 'vona';
declare module 'vona' {
  export interface IBeanScopeRecord {
    'a-validator': ScopeModuleAValidator;
  }

  export interface IBeanScopeContainer {
    validator: ScopeModuleAValidator;
  }
}
/** scope: end */
