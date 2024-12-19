/** scope: begin */
import { BeanScopeBase, TypeModuleBean, BeanScopeUtil } from 'vona';
import { Scope } from 'vona-module-a-bean';

@Scope()
export class ScopeModuleAEvent extends BeanScopeBase {}

export interface ScopeModuleAEvent {
  _bean: TypeModuleBean;
  util: BeanScopeUtil;
}

import 'vona';
declare module 'vona' {
  export interface IBeanScopeRecord {
    'a-event': ScopeModuleAEvent;
  }

  export interface IBeanScopeContainer {
    event: ScopeModuleAEvent;
  }
}

/** scope: end */
