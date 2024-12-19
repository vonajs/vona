/** scope: begin */
import { BeanScopeBase, TypeModuleBean, BeanScopeUtil } from 'vona';
import { Scope } from 'vona-module-a-bean';

@Scope()
export class ScopeModuleAVona extends BeanScopeBase {}

export interface ScopeModuleAVona {
  _bean: TypeModuleBean;
  util: BeanScopeUtil;
}

import 'vona';
declare module 'vona' {
  export interface IBeanScopeRecord {
    'a-vona': ScopeModuleAVona;
  }

  export interface IBeanScopeContainer {
    vona: ScopeModuleAVona;
  }
}

/** scope: end */
