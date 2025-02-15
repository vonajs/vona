/** service: end */
/** scope: begin */
import type { BeanScopeUtil } from 'vona';
/** service: end */
/** service: begin */
import type { ServiceAop } from '../service/aop.js';
import type { ServiceFilter } from '../service/filter.js';
/** service: end */
/** service: begin */

import { BeanScopeBase } from 'vona';
import { Scope } from 'vona-module-a-bean';
/** service: begin */
import 'vona';
import 'vona';

import 'vona';

export * from '../service/aop.js';
export * from '../service/filter.js';
declare module 'vona-module-a-web' {
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
export interface IModuleService {
  aop: ServiceAop;
  filter: ServiceFilter;
}
declare module 'vona' {
  export interface IBeanRecordGeneral {
    'a-aspect.service.aop': ServiceAop;
    'a-aspect.service.filter': ServiceFilter;
  }
}

@Scope()
export class ScopeModuleAAspect extends BeanScopeBase {}

export interface ScopeModuleAAspect {
  util: BeanScopeUtil;
  service: IModuleService;
}
declare module 'vona' {
  export interface IBeanScopeRecord {
    'a-aspect': ScopeModuleAAspect;
  }

  export interface IBeanScopeContainer {
    aspect: ScopeModuleAAspect;
  }
}

/** scope: end */
