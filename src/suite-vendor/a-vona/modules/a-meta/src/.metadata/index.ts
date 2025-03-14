import type { BeanScopeUtil } from 'vona';
/** scope: begin */
import { BeanScopeBase } from 'vona';
import { Scope } from 'vona-module-a-bean';

import 'vona';

@Scope()
export class ScopeModuleAMeta extends BeanScopeBase {}

export interface ScopeModuleAMeta {
  util: BeanScopeUtil;
}
declare module 'vona' {
  export interface IBeanScopeRecord {
    'a-meta': ScopeModuleAMeta;
  }

  export interface IBeanScopeContainer {
    meta: ScopeModuleAMeta;
  }

}

/** scope: end */
