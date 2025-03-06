import type { BeanScopeUtil } from 'vona';
import type { IDecoratorBroadcastOptions } from 'vona-module-a-broadcast';
import type { IAopMethodOptionsLog } from '../bean/aopMethod.log.ts';
/** bean: end */
/** bean: begin */
import type { BeanLogger } from '../bean/bean.logger.ts';

/** broadcast: end */
/** broadcast: begin */
import type { BroadcastSetLevel } from '../bean/broadcast.setLevel.ts';
/** middlewareSystem: end */
/** aopMethod: begin */
import type { IMiddlewareSystemOptionsHttpLog } from '../bean/middlewareSystem.httpLog.ts';
/** broadcast: end */
/** scope: begin */
import { BeanScopeBase } from 'vona';

import { Scope } from 'vona-module-a-bean';
import 'vona';
import 'vona';
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
/** aopMethod: end */
/** bean: begin */
export * from '../bean/bean.logger.ts';
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
/** bean: end */
/** broadcast: begin */
export * from '../bean/broadcast.setLevel.ts';
declare module 'vona' {

}
declare module 'vona-module-a-logger' {

  export interface BeanLogger {
    /** @internal */
    get scope(): ScopeModuleALogger;
  }
}
declare module 'vona' {
  export interface IBeanRecordGlobal {
    logger: BeanLogger;
  }
}
/** middlewareSystem: begin */
export * from '../bean/middlewareSystem.httpLog.ts';
declare module 'vona-module-a-broadcast' {

  export interface IBroadcastRecord {
    'a-logger:setLevel': IDecoratorBroadcastOptions;
  }

}
declare module 'vona-module-a-logger' {

  export interface BroadcastSetLevel {
    /** @internal */
    get scope(): ScopeModuleALogger;
  }
}
export interface IModuleBroadcast {
  setLevel: BroadcastSetLevel;
}

@Scope()
export class ScopeModuleALogger extends BeanScopeBase {}

export interface ScopeModuleALogger {
  util: BeanScopeUtil;
  broadcast: IModuleBroadcast;
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
