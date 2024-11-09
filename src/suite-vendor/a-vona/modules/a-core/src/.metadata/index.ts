/** middlewares: begin */
export * from '../bean/middleware.development.js';
export * from '../bean/middleware.guard.js';
export * from '../bean/middleware.interceptor.js';
export * from '../bean/middleware.pipe.js';
export * from '../bean/middleware.transaction.js';
import { IMiddlewareOptionsDevelopment } from '../bean/middleware.development.js';
import { IMiddlewareOptionsGuard } from '../bean/middleware.guard.js';
import { IMiddlewareOptionsInterceptor } from '../bean/middleware.interceptor.js';
import { IMiddlewareOptionsPipe } from '../bean/middleware.pipe.js';
import { IMiddlewareOptionsTransaction } from '../bean/middleware.transaction.js';
import 'vona';
declare module 'vona' {
  export interface IMiddlewareRecordGlobal {
    'a-core:guard': IMiddlewareOptionsGuard;
    'a-core:interceptor': IMiddlewareOptionsInterceptor;
    'a-core:pipe': IMiddlewareOptionsPipe;
  }

  export interface IMiddlewareRecordLocal {
    'a-core:development': IMiddlewareOptionsDevelopment;
    'a-core:transaction': IMiddlewareOptionsTransaction;
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
