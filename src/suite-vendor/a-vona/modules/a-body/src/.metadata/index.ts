import type { BeanScopeUtil, TypeModuleConfig } from 'vona';
/** bean: end */
/** bean: begin */
import type { BeanBody } from '../bean/bean.body.ts';
import type { config } from '../config/config.ts';
/** config: end */
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
/** bean: end */
/** config: begin */
export * from '../config/config.ts';

@Scope()
export class ScopeModuleABody extends BeanScopeBase {}

export interface ScopeModuleABody {
  util: BeanScopeUtil;
  config: TypeModuleConfig<typeof config>;
}
declare module 'vona' {
  export interface IBeanScopeRecord {
    'a-body': ScopeModuleABody;
  }

  export interface IBeanScopeContainer {
    body: ScopeModuleABody;
  }

  export interface IBeanScopeConfig {
    'a-body': ReturnType<typeof config>;
  }

}

/** scope: end */
