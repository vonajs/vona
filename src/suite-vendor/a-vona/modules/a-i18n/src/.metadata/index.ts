/** middlewareSystem: begin */
export * from '../bean/middlewareSystem.i18n.js';
import { IMiddlewareSystemOptionsI18n } from '../bean/middlewareSystem.i18n.js';
import 'vona';
declare module 'vona-module-a-aspect' {
  export interface IMiddlewareSystemRecord {
    'a-i18n:i18n': IMiddlewareSystemOptionsI18n;
  }
}
declare module 'vona-module-a-i18n' {
  export interface MiddlewareSystemI18n {
    /** @internal */
    get scope(): ScopeModuleAI18n;
  }
}
/** middlewareSystem: end */
/** scope: begin */
import { BeanScopeBase, BeanScopeUtil } from 'vona';
import { Scope } from 'vona-module-a-bean';

@Scope()
export class ScopeModuleAI18n extends BeanScopeBase {}

export interface ScopeModuleAI18n {
  util: BeanScopeUtil;
}

import 'vona';
declare module 'vona' {
  export interface IBeanScopeRecord {
    'a-i18n': ScopeModuleAI18n;
  }

  export interface IBeanScopeContainer {
    i18n: ScopeModuleAI18n;
  }
}

/** scope: end */
