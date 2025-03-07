import type { BeanScopeUtil, TypeModuleConfig } from 'vona';
/** config: begin */
import type { config } from '../config/config.ts';
/** config: end */
/** scope: begin */
import { BeanScopeBase } from 'vona';
import { Scope } from 'vona-module-a-bean';

import 'vona';

export * from '../config/config.ts';

@Scope()
export class ScopeModuleAJwt extends BeanScopeBase {}

export interface ScopeModuleAJwt {
  util: BeanScopeUtil;
  config: TypeModuleConfig<typeof config>;
}
declare module 'vona' {
  export interface IBeanScopeRecord {
    'a-jwt': ScopeModuleAJwt;
  }

  export interface IBeanScopeContainer {
    jwt: ScopeModuleAJwt;
  }

  export interface IBeanScopeConfig {
    'a-jwt': ReturnType<typeof config>;
  }

}

/** scope: end */
