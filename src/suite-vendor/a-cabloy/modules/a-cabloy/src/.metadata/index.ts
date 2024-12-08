/** scope: begin */
import { BeanScopeBase, Scope, TypeModuleBean, BeanScopeUtil } from 'vona';

@Scope()
export class ScopeModuleACabloy extends BeanScopeBase {}

export interface ScopeModuleACabloy {
  _bean: TypeModuleBean;
  util: BeanScopeUtil;
}

import 'vona';
declare module 'vona' {
  export interface IBeanScopeRecord {
    'a-cabloy': ScopeModuleACabloy;
  }

  export interface IBeanScopeContainer {
    cabloy: ScopeModuleACabloy;
  }
}

/** scope: end */
