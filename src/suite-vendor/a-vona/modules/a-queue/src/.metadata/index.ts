/** startup: begin */
export * from '../bean/startup.loadQueueWorkers.js';

import { type IDecoratorStartupOptions } from 'vona-module-a-startup';
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
/** startup: end */
/** service: begin */
export * from '../service/queue.js';

import 'vona';
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
/** service: end */
/** service: begin */
import type { ServiceQueue } from '../service/queue.js';
export interface IModuleService {
  queue: ServiceQueue;
}
/** service: end */
/** service: begin */

import 'vona';
declare module 'vona' {
  export interface IBeanRecordGeneral {
    'a-queue.service.queue': ServiceQueue;
  }
}
/** service: end */
/** config: begin */
export * from '../config/config.js';
import type { config } from '../config/config.js';
/** config: end */
/** monkey: begin */
export * from '../monkey.js';
/** monkey: end */
/** scope: begin */
import type { BeanScopeUtil } from 'vona';
import { BeanScopeBase, type TypeModuleConfig } from 'vona';
import { Scope } from 'vona-module-a-bean';

@Scope()
export class ScopeModuleAQueue extends BeanScopeBase {}

export interface ScopeModuleAQueue {
  util: BeanScopeUtil;
  config: TypeModuleConfig<typeof config>;
  service: IModuleService;
}

import 'vona';
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
