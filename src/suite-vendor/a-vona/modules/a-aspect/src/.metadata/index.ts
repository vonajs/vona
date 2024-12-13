/** scope: begin */
import { BeanScopeBase, Scope, TypeModuleBean, BeanScopeUtil } from 'vona';

@Scope()
export class ScopeModuleAAspect extends BeanScopeBase {}

export interface ScopeModuleAAspect {
  _bean: TypeModuleBean;
  util: BeanScopeUtil;
}

import 'vona';
declare module 'vona' {
  export interface IBeanScopeRecord {
    'a-aspect': ScopeModuleAAspect;
  }

  export interface IBeanScopeContainer {
    aspect: ScopeModuleAAspect;
  }
}

/** scope: end */
