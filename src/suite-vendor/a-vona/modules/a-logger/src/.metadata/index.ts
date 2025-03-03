import type { BeanScopeUtil, TypeModuleConfig } from 'vona';
/** bean: end */
/** bean: begin */
import type { BeanLogger } from '../bean/bean.logger.ts';
import type { config } from '../config/config.ts';

/** service: end */
/** service: begin */
import type { ServiceLoggerClient } from '../service/loggerClient.ts';
/** config: end */
/** scope: begin */
import { BeanScopeBase } from 'vona';
import { Scope } from 'vona-module-a-bean';
/** service: end */
/** service: begin */

/** bean: begin */
import 'vona';
import 'vona';
import 'vona';
import 'vona';

import 'vona';

export * from '../bean/bean.logger.ts';
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
/** service: end */
/** config: begin */
export * from '../config/config.ts';
declare module 'vona-module-a-web' {

  export interface IServiceRecord {
    'a-logger:loggerClient': never;
  }

}
declare module 'vona-module-a-logger' {

  export interface ServiceLoggerClient {
    /** @internal */
    get scope(): ScopeModuleALogger;
  }
}
export interface IModuleService {
  loggerClient: ServiceLoggerClient;
}
declare module 'vona' {
  export interface IBeanRecordGeneral {
    'a-logger.service.loggerClient': ServiceLoggerClient;
  }
}
/** bean: end */
/** service: begin */
export * from '../service/loggerClient.ts';

@Scope()
export class ScopeModuleALogger extends BeanScopeBase {}

export interface ScopeModuleALogger {
  util: BeanScopeUtil;
  config: TypeModuleConfig<typeof config>;
  service: IModuleService;
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
