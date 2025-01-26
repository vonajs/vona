/** middlewareSystem: begin */
export * from '../bean/middlewareSystem.static.js';
import { IMiddlewareSystemOptionsStatic } from '../bean/middlewareSystem.static.js';
import 'vona';
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
/** middlewareSystem: end */
/** scope: begin */
import { BeanScopeBase, BeanScopeUtil } from 'vona';
import { Scope } from 'vona-module-a-bean';

@Scope()
export class ScopeModuleAStatic extends BeanScopeBase {}

export interface ScopeModuleAStatic {
  util: BeanScopeUtil;
}

import 'vona';
declare module 'vona' {
  export interface IBeanScopeRecord {
    'a-static': ScopeModuleAStatic;
  }

  export interface IBeanScopeContainer {
    static: ScopeModuleAStatic;
  }
}

/** scope: end */
