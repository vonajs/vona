import type { BeanScopeUtil } from 'vona';
/** bean: end */
/** bean: begin */
import type { BeanBody } from '../bean/bean.body.ts';
/** bean: end */
/** scope: begin */
import { BeanScopeBase } from 'vona';
import { Scope } from 'vona-module-a-bean';
/** bean: begin */
import 'vona';
import 'vona';

import 'vona';

export * from '../bean/bean.body.ts';
declare module 'vona' {

}
declare module 'vona-module-a-body' {

  export interface BeanBody {
    /** @internal */
    get scope(): ScopeModuleABody;
  }
}
declare module 'vona' {
  export interface IBeanRecordGlobal {
    body: BeanBody;
  }
}

@Scope()
export class ScopeModuleABody extends BeanScopeBase {}

export interface ScopeModuleABody {
  util: BeanScopeUtil;
}
declare module 'vona' {
  export interface IBeanScopeRecord {
    'a-body': ScopeModuleABody;
  }

  export interface IBeanScopeContainer {
    body: ScopeModuleABody;
  }

}

/** scope: end */
