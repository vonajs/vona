/** monkey: end */
/** scope: begin */
import type { BeanScopeUtil } from 'vona';

import type { TypeModuleConfig } from 'vona';
/** startup: begin */
import type { IDecoratorStartupOptions } from 'vona-module-a-startup';
/** service: end */
/** service: begin */

import type { config } from '../config/config.js';
/** service: end */
/** service: begin */
import type { ServiceQueue } from '../service/queue.js';
import { BeanScopeBase } from 'vona';
import { Scope } from 'vona-module-a-bean';
import 'vona';
import 'vona';

import 'vona';

export * from '../bean/startup.loadQueueWorkers.js';
declare module 'vona-module-a-startup' {
  export interface IStartupRecord {
    'a-queue:loadQueueWorkers': IDecoratorStartupOptions;
  }
}
declare module 'vona-module-a-queue' {
  export interface StartupLoadQueueWorkers {
    /** @internal */
    get scope(): ScopeModuleAQueue;
  }
}
/** service: end */
/** config: begin */
export * from '../config/config.js';
declare module 'vona-module-a-web' {
  export interface IServiceRecord {
    'a-queue:queue': never;
  }
}
declare module 'vona-module-a-queue' {
  export interface ServiceQueue {
    /** @internal */
    get scope(): ScopeModuleAQueue;
  }
}
export interface IModuleService {
  queue: ServiceQueue;
}
declare module 'vona' {
  export interface IBeanRecordGeneral {
    'a-queue.service.queue': ServiceQueue;
  }
}
/** config: end */
/** monkey: begin */
export * from '../monkey.js';
/** startup: end */
/** service: begin */
export * from '../service/queue.js';

@Scope()
export class ScopeModuleAQueue extends BeanScopeBase {}

export interface ScopeModuleAQueue {
  util: BeanScopeUtil;
  config: TypeModuleConfig<typeof config>;
  service: IModuleService;
}
declare module 'vona' {
  export interface IBeanScopeRecord {
    'a-queue': ScopeModuleAQueue;
  }

  export interface IBeanScopeContainer {
    queue: ScopeModuleAQueue;
  }

  export interface IBeanScopeConfig {
    'a-queue': ReturnType<typeof config>;
  }
}

/** scope: end */
