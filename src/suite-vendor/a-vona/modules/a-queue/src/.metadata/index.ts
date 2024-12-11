/** beans: begin */
export * from '../bean/bean.redlock.js';
import { BeanRedlock } from '../bean/bean.redlock.js';
import 'vona';
declare module 'vona' {
  export interface IBeanRecordGlobal {
    redlock: BeanRedlock;
  }

  export interface IBeanRecordGeneral {}
}
/** beans: end */
/** queue: begin */
export * from '../bean/queue.schedule.js';

import { IDecoratorQueueOptions } from 'vona';
declare module 'vona' {
  export interface IQueueRecord {
    'a-queue:schedule': IDecoratorQueueOptions;
  }
}
/** queue: end */
/** queue: begin */
import { QueueSchedule } from '../bean/queue.schedule.js';
export interface IModuleQueue {
  schedule: QueueSchedule;
}
/** queue: end */
/** services: begin */
export * from '../service/queue.js';
import { ServiceQueue } from '../service/queue.js';
export interface IModuleService {
  queue: ServiceQueue;
}
import 'vona';
declare module 'vona' {
  export interface IBeanRecordGeneral {
    'a-queue.service.queue': ServiceQueue;
  }
}
/** services: end */
/** config: begin */
export * from '../config/config.js';
import { config } from '../config/config.js';
/** config: end */
/** scope: begin */
import { BeanScopeBase, Scope, TypeModuleBean, BeanScopeUtil, TypeModuleConfig } from 'vona';

@Scope()
export class ScopeModuleAQueue extends BeanScopeBase {}

export interface ScopeModuleAQueue {
  _bean: TypeModuleBean;
  util: BeanScopeUtil;
  config: TypeModuleConfig<typeof config>;
  service: IModuleService;
  queue: IModuleQueue;
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
