/** meta: begin */
export * from '../bean/meta.redlock.js';

import 'vona';
declare module 'vona' {
  export interface IMetaRecord {
    'a-schedule:redlock': never;
  }
}
declare module 'vona-module-a-schedule' {
  export interface MetaRedlock {
    /** @internal */
    get scope(): ScopeModuleASchedule;
  }
}
/** meta: end */
/** meta redlock: begin */
import { MetaRedlock } from '../bean/meta.redlock.js';
/** meta redlock: end */
/** queue: begin */
export * from '../bean/queue.schedule.js';

import { IDecoratorQueueOptions } from 'vona-module-a-queue';
declare module 'vona-module-a-queue' {
  export interface IQueueRecord {
    'a-schedule:schedule': IDecoratorQueueOptions;
  }
}
declare module 'vona-module-a-schedule' {
  export interface QueueSchedule {
    /** @internal */
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
/** startup: begin */
export * from '../bean/startup.loadSchedules.js';

import { IDecoratorStartupOptions } from 'vona-module-a-startup';
declare module 'vona-module-a-startup' {
  export interface IStartupRecord {
    'a-schedule:loadSchedules': IDecoratorStartupOptions;
  }
}
declare module 'vona-module-a-schedule' {
  export interface StartupLoadSchedules {
    /** @internal */
    get scope(): ScopeModuleASchedule;
  }
}
/** startup: end */
/** service: begin */
export * from '../service/schedule.js';

import 'vona';
declare module 'vona' {
  export interface IServiceRecord {
    'a-schedule:schedule': never;
  }
}
declare module 'vona-module-a-schedule' {
  export interface ServiceSchedule {
    /** @internal */
    get scope(): ScopeModuleASchedule;
  }
}
/** service: end */
/** service: begin */
import { ServiceSchedule } from '../service/schedule.js';
export interface IModuleService {
  schedule: ServiceSchedule;
}
/** service: end */
/** service: begin */

import 'vona';
declare module 'vona' {
  export interface IBeanRecordGeneral {
    'a-schedule.service.schedule': ServiceSchedule;
  }
}
/** service: end */
/** config: begin */
export * from '../config/config.js';
import { config } from '../config/config.js';
/** config: end */
/** scope: begin */
import { BeanScopeBase, TypeModuleBean, BeanScopeUtil, TypeModuleConfig } from 'vona';
import { Scope } from 'vona-module-a-bean';

@Scope()
export class ScopeModuleASchedule extends BeanScopeBase {}

export interface ScopeModuleASchedule {
  _bean: TypeModuleBean;
  util: BeanScopeUtil;
  config: TypeModuleConfig<typeof config>;
  redlock: MetaRedlock;
  queue: IModuleQueue;
  service: IModuleService;
}

import 'vona';
declare module 'vona' {
  export interface IBeanScopeRecord {
    'a-schedule': ScopeModuleASchedule;
  }

  export interface IBeanScopeContainer {
    schedule: ScopeModuleASchedule;
  }

  export interface IBeanScopeConfig {
    'a-schedule': ReturnType<typeof config>;
  }
}

/** scope: end */
