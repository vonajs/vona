/** middlewareSystem: begin */
export * from '../bean/middlewareSystem.cors.js';
export * from '../bean/middlewareSystem.securities.js';
import type { IMiddlewareSystemOptionsCors } from '../bean/middlewareSystem.cors.js';
import type { IMiddlewareSystemOptionsSecurities } from '../bean/middlewareSystem.securities.js';
import 'vona';
declare module 'vona-module-a-aspect' {
  export interface IMiddlewareSystemRecord {
    'a-security:cors': IMiddlewareSystemOptionsCors;
    'a-security:securities': IMiddlewareSystemOptionsSecurities;
  }
}
declare module 'vona-module-a-security' {
  export interface MiddlewareSystemCors {
    /** @internal */
    get scope(): ScopeModuleASecurity;
  }

  export interface MiddlewareSystemSecurities {
    /** @internal */
    get scope(): ScopeModuleASecurity;
  }
}
/** middlewareSystem: end */
/** bean: begin */
export * from '../bean/bean.security.js';

import 'vona';
declare module 'vona' {}
declare module 'vona-module-a-security' {
  export interface BeanSecurity {
    /** @internal */
    get scope(): ScopeModuleASecurity;
  }
}
/** bean: end */
/** bean: begin */
import type { BeanSecurity } from '../bean/bean.security.js';
import 'vona';
declare module 'vona' {
  export interface IBeanRecordGlobal {
    security: BeanSecurity;
  }
}
/** bean: end */
/** scope: begin */
import type { BeanScopeUtil } from 'vona';
import { BeanScopeBase } from 'vona';
import { Scope } from 'vona-module-a-bean';

@Scope()
export class ScopeModuleASecurity extends BeanScopeBase {}

export interface ScopeModuleASecurity {
  util: BeanScopeUtil;
}

import 'vona';
declare module 'vona' {
  export interface IBeanScopeRecord {
    'a-security': ScopeModuleASecurity;
  }

  export interface IBeanScopeContainer {
    security: ScopeModuleASecurity;
  }
}

/** scope: end */
