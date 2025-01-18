/** bean: begin */
export * from '../bean/bean.onion.js';

import 'vona';
declare module 'vona' {}
declare module 'vona-module-a-onion' {
  export interface BeanOnion {
    /** @internal */
    get scope(): ScopeModuleAOnion;
  }
}
/** bean: end */
/** bean: begin */
import { BeanOnion } from '../bean/bean.onion.js';
import 'vona';
declare module 'vona' {
  export interface IBeanRecordGlobal {
    onion: BeanOnion;
  }
}
/** bean: end */
/** service: begin */
export * from '../service/onion_.js';

import 'vona';
declare module 'vona-module-a-web' {}
declare module 'vona-module-a-onion' {}
/** service: end */
/** scope: begin */
import { BeanScopeBase, BeanScopeUtil } from 'vona';
import { Scope } from 'vona-module-a-bean';

@Scope()
export class ScopeModuleAOnion extends BeanScopeBase {}

export interface ScopeModuleAOnion {
  util: BeanScopeUtil;
}

import 'vona';
declare module 'vona' {
  export interface IBeanScopeRecord {
    'a-onion': ScopeModuleAOnion;
  }

  export interface IBeanScopeContainer {
    onion: ScopeModuleAOnion;
  }
}

/** scope: end */
