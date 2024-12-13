/** beans: begin */
export * from '../bean/bean.router.js';
import { BeanRouter } from '../bean/bean.router.js';
import 'vona';
declare module 'vona' {
  export interface IBeanRecordGlobal {
    router: BeanRouter;
  }

  export interface IBeanRecordGeneral {}
}
declare module 'vona-module-a-web' {
  export interface BeanRouter {
    get scope(): ScopeModuleAWeb;
  }
}
/** beans: end */
/** scope: begin */
import { BeanScopeBase, Scope, TypeModuleBean, BeanScopeUtil } from 'vona';

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
