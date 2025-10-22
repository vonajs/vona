/* eslint-disable */
/** middlewareSystem: begin */
export * from '../bean/middlewareSystem.httpLog.ts';
import type { IMiddlewareSystemOptionsHttpLog } from '../bean/middlewareSystem.httpLog.ts';
import 'vona-module-a-aspect';
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

          export interface MiddlewareSystemHttpLog {
            get $beanFullName(): 'a-logger.middlewareSystem.httpLog';
            get $onionName(): 'a-logger:httpLog';
            get $onionOptions(): IMiddlewareSystemOptionsHttpLog;
          } 
}
/** middlewareSystem: end */
/** aopMethod: begin */
export * from '../bean/aopMethod.log.ts';
import type { IAopMethodOptionsLog } from '../bean/aopMethod.log.ts';
import 'vona-module-a-aspect';
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

          export interface AopMethodLog {
            get $beanFullName(): 'a-logger.aopMethod.log';
            get $onionName(): 'a-logger:log';
            get $onionOptions(): IAopMethodOptionsLog;
          } 
}
/** aopMethod: end */
/** bean: begin */
export * from '../bean/bean.logger.ts';

import 'vona';
declare module 'vona' {
  
  
}
declare module 'vona-module-a-logger' {
  
        export interface BeanLogger {
          /** @internal */
          get scope(): ScopeModuleALogger;
        } 
}
/** bean: end */
/** bean: begin */
import type { BeanLogger } from '../bean/bean.logger.ts';
import 'vona';  
declare module 'vona' {
  export interface IBeanRecordGlobal {
    'logger': BeanLogger;
  }
}
/** bean: end */
/** broadcast: begin */
export * from '../bean/broadcast.setLevel.ts';

import { type IDecoratorBroadcastOptions } from 'vona-module-a-broadcast';
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

          export interface BroadcastSetLevel {
            get $beanFullName(): 'a-logger.broadcast.setLevel';
            get $onionName(): 'a-logger:setLevel';
            get $onionOptions(): IDecoratorBroadcastOptions;
          } 
}
/** broadcast: end */
/** broadcast: begin */
import type { BroadcastSetLevel } from '../bean/broadcast.setLevel.ts';
export interface IModuleBroadcast {
  'setLevel': BroadcastSetLevel;
}
/** broadcast: end */
/** scope: begin */
import { BeanScopeBase, type BeanScopeUtil } from 'vona';
import { Scope } from 'vona-module-a-bean';

@Scope()
export class ScopeModuleALogger extends BeanScopeBase {}

export interface ScopeModuleALogger {
  util: BeanScopeUtil;
broadcast: IModuleBroadcast;
}

import 'vona';
declare module 'vona' {
  export interface IBeanScopeRecord {
    'a-logger': ScopeModuleALogger;
  }

  export interface IBeanScopeContainer {
    logger: ScopeModuleALogger;
  }
  
  

  

  
}

/** scope: end */
