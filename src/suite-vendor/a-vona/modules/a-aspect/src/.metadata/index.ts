/** service: begin */
export * from '../service/aop.js';
export * from '../service/filter.js';

import 'vona';
declare module 'vona' {
  export interface IServiceRecord {
    'a-aspect:aop': never;
    'a-aspect:filter': never;
  }
}
declare module 'vona-module-a-aspect' {
  export interface ServiceAop {
    /** @internal */
    get scope(): ScopeModuleAAspect;
  }

  export interface ServiceFilter {
    /** @internal */
    get scope(): ScopeModuleAAspect;
  }
}
/** service: end */
/** service: begin */
import { ServiceAop } from '../service/aop.js';
import { ServiceFilter } from '../service/filter.js';
export interface IModuleService {
  aop: ServiceAop;
  filter: ServiceFilter;
}
/** service: end */
/** service: begin */

import 'vona';
declare module 'vona' {
  export interface IBeanRecordGeneral {
    'a-aspect.service.aop': ServiceAop;
    'a-aspect.service.filter': ServiceFilter;
  }
}
/** service: end */
/** scope: begin */
import { BeanScopeBase, TypeModuleBean, BeanScopeUtil } from 'vona';
import { Scope } from 'vona-module-a-bean';

@Scope()
export class ScopeModuleAAspect extends BeanScopeBase {}

export interface ScopeModuleAAspect {
  _bean: TypeModuleBean;
  util: BeanScopeUtil;
  service: IModuleService;
}

import 'vona';
declare module 'vona' {
  export interface IBeanScopeRecord {
    'a-aspect': ScopeModuleAAspect;
  }

  export interface IBeanScopeContainer {
    aspect: ScopeModuleAAspect;
  }
}

/** scope: end */
