/** bean: begin */
export * from '../bean/bean.router.js';

import 'vona';
declare module 'vona' {}
declare module 'vona-module-a-web' {
  export interface BeanRouter {
    /** @internal */
    get scope(): ScopeModuleAWeb;
  }
}
/** bean: end */
/** bean: begin */
import type { BeanRouter } from '../bean/bean.router.js';
import 'vona';
declare module 'vona' {
  export interface IBeanRecordGlobal {
    router: BeanRouter;
  }
}
/** bean: end */
/** main: begin */
export * from '../main.js';
/** main: end */
/** scope: begin */
import type { BeanScopeUtil } from 'vona';
import { BeanScopeBase } from 'vona';
import { Scope } from 'vona-module-a-bean';

@Scope()
export class ScopeModuleAWeb extends BeanScopeBase {}

export interface ScopeModuleAWeb {
  util: BeanScopeUtil;
}

import 'vona';
declare module 'vona' {
  export interface IBeanScopeRecord {
    'a-web': ScopeModuleAWeb;
  }

  export interface IBeanScopeContainer {
    web: ScopeModuleAWeb;
  }
}

/** scope: end */
