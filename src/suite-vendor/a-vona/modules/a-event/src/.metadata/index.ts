/** scope: begin */
import type { BeanScopeUtil } from 'vona';
import { BeanScopeBase } from 'vona';
import { Scope } from 'vona-module-a-bean';

import 'vona';

@Scope()
export class ScopeModuleAEvent extends BeanScopeBase {}

export interface ScopeModuleAEvent {
  util: BeanScopeUtil;
}
declare module 'vona' {
  export interface IBeanScopeRecord {
    'a-event': ScopeModuleAEvent;
  }

  export interface IBeanScopeContainer {
    event: ScopeModuleAEvent;
  }
}

/** scope: end */
