import type { BeanScopeUtil } from 'vona';
/** scope: begin */
import { BeanScopeBase } from 'vona';
import { Scope } from '../lib/scope.ts';

import 'vona';

@Scope()
export class ScopeModuleABean extends BeanScopeBase {}

export interface ScopeModuleABean {
  util: BeanScopeUtil;
}
declare module 'vona' {
  export interface IBeanScopeRecord {
    'a-bean': ScopeModuleABean;
  }

  export interface IBeanScopeContainer {
    bean: ScopeModuleABean;
  }

}

/** scope: end */
