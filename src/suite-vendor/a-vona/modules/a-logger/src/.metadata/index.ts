import type { BeanScopeUtil } from 'vona';
/** aopMethod: begin */
import type { IAopMethodOptionsLog } from '../bean/aopMethod.log.ts';
/** aopMethod: end */
/** scope: begin */
import { BeanScopeBase } from 'vona';
import { Scope } from 'vona-module-a-bean';
import 'vona';

import 'vona';

export * from '../bean/aopMethod.log.ts';
declare module 'vona-module-a-aspect' {

  export interface IAopMethodRecord {
    'a-logger:log': IAopMethodOptionsLog;
  }

}
declare module 'vona-module-a-logger' {

  export interface AopMethodLog {
    /** @internal */
    get scope(): ScopeModuleALogger;
  }
}

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
