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
/** services: end */
/** scope: begin */
import { BeanScopeBase, Scope, TypeModuleBean, BeanScopeUtil } from 'vona';

@Scope()
export class ScopeModuleASchedule extends BeanScopeBase {}

export interface ScopeModuleASchedule {
  _bean: TypeModuleBean;
  util: BeanScopeUtil;
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
}

/** scope: end */
