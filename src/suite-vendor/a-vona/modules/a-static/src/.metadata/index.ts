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
