/** beans: begin */
export * from '../bean/bean.event.js';
import { BeanEvent } from '../bean/bean.event.js';
import 'vona';
declare module 'vona' {
  export interface IBeanRecordGlobal {
    event: BeanEvent;
  }

  export interface IBeanRecordGeneral {}
}
/** beans: end */
/** scope: begin */
import { BeanScopeBase, Scope, TypeModuleResource } from 'vona';

@Scope()
export class ScopeModuleAEvent extends BeanScopeBase {}

export interface ScopeModuleAEvent extends TypeModuleResource<any, any, any, any, any, any> {}

import 'vona';
declare module 'vona' {
  export interface IBeanScopeRecord {
    'a-event': ScopeModuleAEvent;
  }

  export interface IBeanScopeContainer {
    event: ScopeModuleAEvent;
  }
}
/** scope: end */
