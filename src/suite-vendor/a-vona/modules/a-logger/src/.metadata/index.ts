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
export class ScopeModuleALogger extends BeanScopeBase {}

export interface ScopeModuleALogger {
  util: BeanScopeUtil;
  config: TypeModuleConfig<typeof config>;
}
declare module 'vona' {
  export interface IBeanScopeRecord {
    'a-logger': ScopeModuleALogger;
  }

  export interface IBeanScopeContainer {
    logger: ScopeModuleALogger;
  }

  export interface IBeanScopeConfig {
    'a-logger': ReturnType<typeof config>;
  }

}

/** scope: end */
