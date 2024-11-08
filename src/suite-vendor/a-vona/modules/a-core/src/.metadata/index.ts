/** beans: begin */
export * from '../bean/middleware.guard.js';
export * from '../bean/middleware.test.js';
import { MiddlewareGuard } from '../bean/middleware.guard.js';
import { MiddlewareTest } from '../bean/middleware.test.js';
import 'vona';
declare module 'vona' {
  export interface IBeanRecordGlobal {}

  export interface IBeanRecordGeneral {
    'a-core.middleware.guard': MiddlewareGuard;
    'a-core.middleware.test': MiddlewareTest;
  }
}
/** beans: end */
/** scope: begin */
import { BeanScopeBase, Scope, TypeModuleResource } from 'vona';

@Scope()
export class ScopeModuleACore extends BeanScopeBase {}

export interface ScopeModuleACore extends TypeModuleResource<any, any, any, any, any, any> {}

import 'vona';
declare module 'vona' {
  export interface IBeanScopeRecord {
    'a-core': ScopeModuleACore;
  }

  export interface IBeanScopeContainer {
    core: ScopeModuleACore;
  }
}
/** scope: end */
