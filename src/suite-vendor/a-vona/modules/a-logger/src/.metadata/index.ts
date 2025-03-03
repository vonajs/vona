import type { BeanScopeUtil } from 'vona';
/** scope: begin */
import { BeanScopeBase } from 'vona';
import { Scope } from 'vona-module-a-bean';

import 'vona';

@Scope()
export class ScopeModuleALogger extends BeanScopeBase {}

export interface ScopeModuleALogger {
  util: BeanScopeUtil;
}
declare module 'vona' {
  export interface IBeanScopeRecord {
    'a-logger': ScopeModuleALogger;
  }

  export interface IBeanScopeContainer {
    logger: ScopeModuleALogger;
  }

}

/** scope: end */
