/** scope: begin */
import { BeanScopeBase, TypeModuleBean, BeanScopeUtil } from 'vona';
import { Scope } from 'vona-module-a-bean';

@Scope()
export class ScopeModuleAMeta extends BeanScopeBase {}

export interface ScopeModuleAMeta {
  _bean: TypeModuleBean;
  util: BeanScopeUtil;
}

import 'vona';
declare module 'vona' {
  export interface IBeanScopeRecord {
    'a-meta': ScopeModuleAMeta;
  }

  export interface IBeanScopeContainer {
    meta: ScopeModuleAMeta;
  }
}

/** scope: end */
