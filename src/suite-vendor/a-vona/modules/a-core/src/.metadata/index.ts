/** middlewares: begin */
export * from '../bean/middleware.guard.js';
import { IMiddlewareOptionsGuard } from '../bean/middleware.guard.js';
import 'vona';
declare module 'vona' {
  export interface IMiddlewareRecord {
    'a-core:guard': IMiddlewareOptionsGuard;
  }
}
/** middlewares: end */
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
