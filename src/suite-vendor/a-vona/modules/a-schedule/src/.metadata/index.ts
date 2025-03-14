import type { BeanScopeUtil, TypeModuleConfig } from 'vona';
import type { IDecoratorQueueOptions } from 'vona-module-a-queue';

import type { IDecoratorStartupOptions } from 'vona-module-a-startup';
/** meta: end */
/** meta redlock: begin */
import type { MetaRedlock } from '../bean/meta.redlock.ts';

/** queue: end */
/** queue: begin */
import type { QueueSchedule } from '../bean/queue.schedule.ts';
import type { config } from '../config/config.ts';

/** service: end */
/** service: begin */
import type { ServiceSchedule } from '../service/schedule.ts';
/** config: end */
/** scope: begin */
import { BeanScopeBase } from 'vona';
/** service: end */
/** service: begin */

import { Scope } from 'vona-module-a-bean';
/** meta: begin */
import 'vona';
import 'vona';
import 'vona';

import 'vona';

export * from '../bean/meta.redlock.ts';
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
/** meta redlock: end */
/** queue: begin */
export * from '../bean/queue.schedule.ts';
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
export interface IModuleQueue {
  schedule: QueueSchedule;
}
/** queue: end */
/** startup: begin */
export * from '../bean/startup.loadSchedules.ts';
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
/** service: end */
/** config: begin */
export * from '../config/config.ts';
declare module 'vona-module-a-web' {

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
export interface IModuleService {
  schedule: ServiceSchedule;
}
declare module 'vona' {
  export interface IBeanRecordGeneral {
    'a-schedule.service.schedule': ServiceSchedule;
  }
}
/** startup: end */
/** service: begin */
export * from '../service/schedule.ts';

@Scope()
export class ScopeModuleASchedule extends BeanScopeBase {}

export interface ScopeModuleASchedule {
  util: BeanScopeUtil;
  config: TypeModuleConfig<typeof config>;
  redlock: MetaRedlock;
  queue: IModuleQueue;
  service: IModuleService;
}
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
