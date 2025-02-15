/** main: end */
/** scope: begin */
import type { BeanScopeUtil } from 'vona';
/** bean: end */
/** bean: begin */
import type { BeanRouter } from '../bean/bean.router.js';
import { BeanScopeBase } from 'vona';
import { Scope } from 'vona-module-a-bean';
/** bean: begin */
import 'vona';
import 'vona';

import 'vona';

export * from '../bean/bean.router.js';
declare module 'vona' {}
declare module 'vona-module-a-web' {
  export interface BeanRouter {
    /** @internal */
    get scope(): ScopeModuleAWeb;
  }
}
declare module 'vona' {
  export interface IBeanRecordGlobal {
    router: BeanRouter;
  }
}
/** bean: end */
/** main: begin */
export * from '../main.js';

@Scope()
export class ScopeModuleAWeb extends BeanScopeBase {}

export interface ScopeModuleAWeb {
  util: BeanScopeUtil;
}
declare module 'vona' {
  export interface IBeanScopeRecord {
    'a-web': ScopeModuleAWeb;
  }

  export interface IBeanScopeContainer {
    web: ScopeModuleAWeb;
  }
}

/** scope: end */
