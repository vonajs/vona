import type { BeanScopeUtil } from 'vona';
import type { IAopMethodOptionsLog } from '../bean/aopMethod.log.ts';
/** middlewareSystem: end */
/** aopMethod: begin */
import type { IMiddlewareSystemOptionsHttpLog } from '../bean/middlewareSystem.httpLog.ts';
/** aopMethod: end */
/** scope: begin */
import { BeanScopeBase } from 'vona';
import { Scope } from 'vona-module-a-bean';
import 'vona';
import 'vona';

import 'vona';

export * from '../bean/aopMethod.log.ts';
declare module 'vona-module-a-aspect' {

  export interface IMiddlewareSystemRecord {
    'a-logger:httpLog': IMiddlewareSystemOptionsHttpLog;
  }

}
declare module 'vona-module-a-logger' {

  export interface MiddlewareSystemHttpLog {
    /** @internal */
    get scope(): ScopeModuleALogger;
  }
}
/** middlewareSystem: begin */
export * from '../bean/middlewareSystem.httpLog.ts';
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
