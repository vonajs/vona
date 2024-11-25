/** beans: begin */
export * from '../bean/filter.error.js';
export * from '../bean/filter.error_.js';
import { FilterError } from '../bean/filter.error.js';
import 'vona';
declare module 'vona' {
  export interface IBeanRecordGlobal {}

  export interface IBeanRecordGeneral {
    'a-core.filter.error': FilterError;
  }
}
/** beans: end */
/** middlewares: begin */
export * from '../bean/middleware.development.js';
import { IMiddlewareOptionsDevelopment } from '../bean/middleware.development.js';
import 'vona';
declare module 'vona' {
  export interface IMiddlewareRecordLocal {
    'a-core:development': IMiddlewareOptionsDevelopment;
  }
}
/** middlewares: end */
/** guards: begin */
export * from '../bean/guard.user.js';
import { IGuardOptionsUser } from '../bean/guard.user.js';
import 'vona';
declare module 'vona' {
  export interface IGuardRecordGlobal {
    'a-core:user': IGuardOptionsUser;
  }
}
/** guards: end */
/** interceptors: begin */
export * from '../bean/interceptor.body.js';
import { IInterceptorOptionsBody } from '../bean/interceptor.body.js';
import 'vona';
declare module 'vona' {
  export interface IInterceptorRecordGlobal {
    'a-core:body': IInterceptorOptionsBody;
  }
}
/** interceptors: end */
/** scope: begin */
import { BeanScopeBase, Scope, TypeModuleResource } from 'vona';

@Scope()
export class ScopeModuleACore extends BeanScopeBase {}

export interface ScopeModuleACore extends TypeModuleResource<never, never, never, never, never, never> {}

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
