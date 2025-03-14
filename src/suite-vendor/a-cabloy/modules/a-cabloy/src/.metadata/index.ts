import type { BeanScopeUtil } from 'vona';
/** scope: begin */
import { BeanScopeBase } from 'vona';
import { Scope } from 'vona-module-a-bean';

import 'vona';

@Scope()
export class ScopeModuleACabloy extends BeanScopeBase {}

export interface ScopeModuleACabloy {
  util: BeanScopeUtil;
}
declare module 'vona' {
  export interface IBeanScopeRecord {
    'a-cabloy': ScopeModuleACabloy;
  }

  export interface IBeanScopeContainer {
    cabloy: ScopeModuleACabloy;
  }

}

/** scope: end */
