/** startup: begin */
export * from '../bean/startup.loadSchedules.js';

import { IDecoratorStartupOptions } from 'vona';
declare module 'vona' {
  export interface IStartupRecord {
    'a-schedule:loadSchedules': IDecoratorStartupOptions;
  }
}
declare module 'vona-module-a-schedule' {
  export interface StartupLoadSchedules {
    get scope(): ScopeModuleASchedule;
  }
}
/** startup: end */
/** queue: begin */
export * from '../bean/queue.schedule.js';

import { IDecoratorQueueOptions } from 'vona-module-a-queue';
declare module 'vona' {
  export interface IQueueRecord {
    'a-schedule:schedule': IDecoratorQueueOptions;
  }
}
declare module 'vona-module-a-schedule' {
  export interface QueueSchedule {
    get scope(): ScopeModuleASchedule;
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
export * from '../service/schedule.js';
import { ServiceSchedule } from '../service/schedule.js';
export interface IModuleService {
  schedule: ServiceSchedule;
}
import 'vona';
declare module 'vona' {
  export interface IBeanRecordGeneral {
    'a-schedule.service.schedule': ServiceSchedule;
  }
}
declare module 'vona-module-a-schedule' {
  export interface ServiceSchedule {
    get scope(): ScopeModuleASchedule;
  }
}
/** services: end */
/** scope: begin */
import { BeanScopeBase, Scope, TypeModuleBean, BeanScopeUtil } from 'vona';

@Scope()
export class ScopeModuleASchedule extends BeanScopeBase {}

export interface ScopeModuleASchedule {
  _bean: TypeModuleBean;
  util: BeanScopeUtil;
  service: IModuleService;
  queue: IModulequeue;
}

import 'vona';
declare module 'vona' {
  export interface IBeanScopeRecord {
    'a-schedule': ScopeModuleASchedule;
  }

  export interface IBeanScopeContainer {
    schedule: ScopeModuleASchedule;
  }
}

/** scope: end */
