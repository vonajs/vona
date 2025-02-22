/** bean: end */
/** scope: begin */
import type { BeanScopeUtil } from 'vona';
/** bean: end */
/** bean: begin */
import type { BeanSecurity } from '../bean/bean.security.ts';
/** middlewareSystem: end */
/** bean: begin */
import type { IMiddlewareSystemOptionsCors } from '../bean/middlewareSystem.cors.ts';

import type { IMiddlewareSystemOptionsSecurities } from '../bean/middlewareSystem.securities.ts';
import { BeanScopeBase } from 'vona';
import { Scope } from 'vona-module-a-bean';
import 'vona';
import 'vona';
import 'vona';

import 'vona';

export * from '../bean/bean.security.ts';
/** middlewareSystem: begin */
export * from '../bean/middlewareSystem.cors.ts';
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
export * from '../bean/middlewareSystem.securities.ts';
declare module 'vona' {}
declare module 'vona-module-a-security' {
  export interface BeanSecurity {
    /** @internal */
    get scope(): ScopeModuleASecurity;
  }
}
declare module 'vona' {
  export interface IBeanRecordGlobal {
    security: BeanSecurity;
  }
}

@Scope()
export class ScopeModuleASecurity extends BeanScopeBase {}

export interface ScopeModuleASecurity {
  util: BeanScopeUtil;
}

declare module 'vona' {
  export interface IBeanScopeRecord {
    'a-security': ScopeModuleASecurity;
  }

  export interface IBeanScopeContainer {
    security: ScopeModuleASecurity;
  }
}

/** scope: end */
