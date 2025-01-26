/** middlewareSystem: begin */
export * from '../bean/middlewareSystem.cors.js';
import { IMiddlewareSystemOptionsCors } from '../bean/middlewareSystem.cors.js';
import 'vona';
declare module 'vona-module-a-aspect' {
  export interface IMiddlewareSystemRecord {
    'a-cors:cors': IMiddlewareSystemOptionsCors;
  }
}
declare module 'vona-module-a-cors' {
  export interface MiddlewareSystemCors {
    /** @internal */
    get scope(): ScopeModuleACors;
  }
}
/** middlewareSystem: end */
/** scope: begin */
import { BeanScopeBase, BeanScopeUtil } from 'vona';
import { Scope } from 'vona-module-a-bean';

@Scope()
export class ScopeModuleACors extends BeanScopeBase {}

export interface ScopeModuleACors {
  util: BeanScopeUtil;
}

import 'vona';
declare module 'vona' {
  export interface IBeanScopeRecord {
    'a-cors': ScopeModuleACors;
  }

  export interface IBeanScopeContainer {
    cors: ScopeModuleACors;
  }
}

/** scope: end */
