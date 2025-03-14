import type { BeanScopeUtil } from 'vona';
/** bean: end */
/** bean: begin */
import type { BeanOnion } from '../bean/bean.onion.ts';
/** main: end */
/** scope: begin */
import { BeanScopeBase } from 'vona';
import { Scope } from 'vona-module-a-bean';

/** bean: begin */
import 'vona';
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
/** service: end */
/** main: begin */
export * from '../main.ts';
declare module 'vona-module-a-web' {

}
declare module 'vona-module-a-onion' {

}
/** bean: end */
/** service: begin */
export * from '../service/onion_.ts';

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
