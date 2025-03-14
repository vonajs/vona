import type { BeanScopeUtil } from 'vona';
/** scope: begin */
import { BeanScopeBase } from 'vona';
import { Scope } from 'vona-module-a-bean';

import 'vona';

@Scope()
export class ScopeModuleAVona extends BeanScopeBase {}

export interface ScopeModuleAVona {
  util: BeanScopeUtil;
}
declare module 'vona' {
  export interface IBeanScopeRecord {
    'a-vona': ScopeModuleAVona;
  }

  export interface IBeanScopeContainer {
    vona: ScopeModuleAVona;
  }

}

/** scope: end */
