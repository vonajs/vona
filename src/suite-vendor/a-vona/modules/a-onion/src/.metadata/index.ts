/** beans: begin */
export * from '../bean/bean.onion.js';
import { BeanOnion } from '../bean/bean.onion.js';
import 'vona';
declare module 'vona' {
  export interface IBeanRecordGlobal {
    onion: BeanOnion;
  }

  export interface IBeanRecordGeneral {}
}
declare module 'vona-module-a-onion' {
  export interface BeanOnion {
    /** @internal */
    get scope(): ScopeModuleAOnion;
  }
}
/** beans: end */
/** service: begin */
export * from '../service/onion_.js';

import 'vona';
declare module 'vona' {}
declare module 'vona-module-a-onion' {
  export interface ServiceOnion {
    /** @internal */
    get scope(): ScopeModuleAOnion;
  }
}
/** service: end */
/** scope: begin */
import { BeanScopeBase, Scope, TypeModuleBean, BeanScopeUtil } from 'vona';

@Scope()
export class ScopeModuleAOnion extends BeanScopeBase {}

export interface ScopeModuleAOnion {
  _bean: TypeModuleBean;
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
