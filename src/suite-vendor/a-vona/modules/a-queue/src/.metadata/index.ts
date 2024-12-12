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
declare module 'vona-module-a-queue' {
  export interface ServiceQueue {
    get scope(): ScopeModuleAQueue;
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
