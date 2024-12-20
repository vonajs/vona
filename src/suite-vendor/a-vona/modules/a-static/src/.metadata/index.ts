/** scope: begin */
import { BeanScopeBase, TypeModuleBean, BeanScopeUtil } from 'vona';
import { Scope } from 'vona-module-a-bean';

@Scope()
export class ScopeModuleAStatic extends BeanScopeBase {}

export interface ScopeModuleAStatic {
  _bean: TypeModuleBean;
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
