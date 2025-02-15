/** middlewareSystem: end */
/** scope: begin */
import type { BeanScopeUtil } from 'vona';
/** middlewareSystem: begin */
import type { IMiddlewareSystemOptionsStatic } from '../bean/middlewareSystem.static.js';
import { BeanScopeBase } from 'vona';
import { Scope } from 'vona-module-a-bean';
import 'vona';

import 'vona';

export * from '../bean/middlewareSystem.static.js';
declare module 'vona-module-a-aspect' {
  export interface IMiddlewareSystemRecord {
    'a-static:static': IMiddlewareSystemOptionsStatic;
  }
}
declare module 'vona-module-a-static' {
  export interface MiddlewareSystemStatic {
    /** @internal */
    get scope(): ScopeModuleAStatic;
  }
}

@Scope()
export class ScopeModuleAStatic extends BeanScopeBase {}

export interface ScopeModuleAStatic {
  util: BeanScopeUtil;
}
declare module 'vona' {
  export interface IBeanScopeRecord {
    'a-static': ScopeModuleAStatic;
  }

  export interface IBeanScopeContainer {
    static: ScopeModuleAStatic;
  }
}

/** scope: end */
