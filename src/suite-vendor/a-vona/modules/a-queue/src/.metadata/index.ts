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
/** scope: begin */
import { BeanScopeBase, Scope, TypeModuleBean, BeanScopeUtil } from 'vona';

@Scope()
export class ScopeModuleAQueue extends BeanScopeBase {}

export interface ScopeModuleAQueue {
  _bean: TypeModuleBean;
  util: BeanScopeUtil;
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
}

/** scope: end */
