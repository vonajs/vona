/** scope: begin */
import { BeanScopeBase, TypeModuleBean, BeanScopeUtil } from 'vona';
import { Scope } from '../lib/scope.js';

@Scope()
export class ScopeModuleABean extends BeanScopeBase {}

export interface ScopeModuleABean {
  _bean: TypeModuleBean;
  util: BeanScopeUtil;
}

import 'vona';
declare module 'vona' {
  export interface IBeanScopeRecord {
    'a-bean': ScopeModuleABean;
  }

  export interface IBeanScopeContainer {
    bean: ScopeModuleABean;
  }
}

/** scope: end */
