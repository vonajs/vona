/* eslint-disable */
/** service: begin */
export * from '../service/aop.ts';
export * from '../service/filter.ts';

import 'vona';
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
/** service: end */
/** service: begin */
import type { ServiceAop } from '../service/aop.ts';
import type { ServiceFilter } from '../service/filter.ts';
export interface IModuleService {
  'aop': ServiceAop;
'filter': ServiceFilter;
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
import { BeanScopeBase, type BeanScopeUtil } from 'vona';
import { Scope } from 'vona-module-a-bean';

@Scope()
export class ScopeModuleAAspect extends BeanScopeBase {}

export interface ScopeModuleAAspect {
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
