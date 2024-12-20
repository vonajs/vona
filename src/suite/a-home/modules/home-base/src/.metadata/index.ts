/** bean: begin */
export * from '../bean/bean.debug.js';

import 'vona';
declare module 'vona' {}
declare module 'vona-module-home-base' {
  export interface BeanDebug {
    /** @internal */
    get scope(): ScopeModuleHomeBase;
  }
}
/** bean: end */
/** bean: begin */
import { BeanDebug } from '../bean/bean.debug.js';
import 'vona';
declare module 'vona' {
  export interface IBeanRecordGlobal {
    debug: BeanDebug;
  }
}
/** bean: end */
/** scope: begin */
import { BeanScopeBase, TypeModuleBean, BeanScopeUtil } from 'vona';
import { Scope } from 'vona-module-a-bean';

@Scope()
export class ScopeModuleHomeBase extends BeanScopeBase {}

export interface ScopeModuleHomeBase {
  _bean: TypeModuleBean;
  util: BeanScopeUtil;
}

import 'vona';
declare module 'vona' {
  export interface IBeanScopeRecord {
    'home-base': ScopeModuleHomeBase;
  }

  export interface IBeanScopeContainer {
    homeBase: ScopeModuleHomeBase;
  }
}

/** scope: end */
