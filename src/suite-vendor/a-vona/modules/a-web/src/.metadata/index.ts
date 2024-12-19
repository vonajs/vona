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
import { BeanRouter } from '../bean/bean.router.js';
import 'vona';
declare module 'vona' {
  export interface IBeanRecordGlobal {
    router: BeanRouter;
  }
}
/** bean: end */
/** monkey: begin */
export * from '../monkey.js';
/** monkey: end */
/** scope: begin */
import { BeanScopeBase, TypeModuleBean, BeanScopeUtil } from 'vona';
import { Scope } from 'vona-module-a-bean';

@Scope()
export class ScopeModuleAWeb extends BeanScopeBase {}

export interface ScopeModuleAWeb {
  _bean: TypeModuleBean;
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
