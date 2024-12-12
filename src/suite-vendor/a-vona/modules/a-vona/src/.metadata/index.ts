/** scope: begin */
import { BeanScopeBase, Scope, TypeModuleBean, BeanScopeUtil } from 'vona';

@Scope()
export class ScopeModuleAVona extends BeanScopeBase {}

export interface ScopeModuleAVona {
  _bean: TypeModuleBean;
  util: BeanScopeUtil;
  queue: IModuleQueue;
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
