import type { TypeModuleConfig } from 'vona';
/** main: end */
/** scope: begin */
import { BeanScopeBase, BeanScopeUtil } from 'vona';
import { Scope } from 'vona-module-a-bean';
/** bean: end */
/** bean: begin */
import { BeanRouter } from '../bean/bean.router.ts';
import { config } from '../config/config.ts';
/** bean: begin */
import 'vona';
import 'vona';

import 'vona';

export * from '../bean/bean.router.ts';
declare module 'vona' {

}
declare module 'vona-module-a-web' {

  export interface BeanRouter {
    /** @internal */
    get scope(): ScopeModuleAWeb;
  }
}
declare module 'vona' {
  export interface IBeanRecordGlobal {
    router: BeanRouter;
  }
}
/** bean: end */
/** config: begin */
export * from '../config/config.ts';
/** config: end */
/** main: begin */
export * from '../main.ts';

@Scope()
export class ScopeModuleAWeb extends BeanScopeBase {}

export interface ScopeModuleAWeb {
  util: BeanScopeUtil;
  config: TypeModuleConfig<typeof config>;
}
declare module 'vona' {
  export interface IBeanScopeRecord {
    'a-web': ScopeModuleAWeb;
  }

  export interface IBeanScopeContainer {
    web: ScopeModuleAWeb;
  }

  export interface IBeanScopeConfig {
    'a-web': ReturnType<typeof config>;
  }

}

/** scope: end */
