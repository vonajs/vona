/** service: begin */
export * from '../service/filter.js';

import 'vona';
declare module 'vona' {
  export interface IServiceRecord {
    'a-aspect:filter': never;
  }
}
declare module 'vona-module-a-aspect' {
  export interface ServiceFilter {
    /** @internal */
    get scope(): ScopeModuleAAspect;
  }
}
/** service: end */
/** service: begin */
import { ServiceFilter } from '../service/filter.js';
export interface IModuleService {
  filter: ServiceFilter;
}
/** service: end */
/** service: begin */
import 'vona';
declare module 'vona' {
  export interface IBeanRecordGeneral {
    'a-aspect.service.filter': ServiceFilter;
  }
}
/** service: end */
/** scope: begin */
import { BeanScopeBase, Scope, TypeModuleBean, BeanScopeUtil } from 'vona';

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
