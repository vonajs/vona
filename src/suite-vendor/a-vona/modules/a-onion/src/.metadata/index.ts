/** bean: end */
/** scope: begin */
import { BeanScopeBase, BeanScopeUtil } from 'vona';
import { Scope } from 'vona-module-a-bean';
/** bean: end */
/** bean: begin */
import { BeanOnion } from '../bean/bean.onion.ts';
/** bean: begin */
import 'vona';
import 'vona';

import 'vona';

export * from '../bean/bean.onion.ts';
declare module 'vona' {

}
declare module 'vona-module-a-onion' {

  export interface BeanOnion {
    /** @internal */
    get scope(): ScopeModuleAOnion;
  }
}
declare module 'vona' {
  export interface IBeanRecordGlobal {
    onion: BeanOnion;
  }
}

@Scope()
export class ScopeModuleAOnion extends BeanScopeBase {}

export interface ScopeModuleAOnion {
  util: BeanScopeUtil;
}
declare module 'vona' {
  export interface IBeanScopeRecord {
    'a-onion': ScopeModuleAOnion;
  }

  export interface IBeanScopeContainer {
    onion: ScopeModuleAOnion;
  }

}

/** scope: end */
