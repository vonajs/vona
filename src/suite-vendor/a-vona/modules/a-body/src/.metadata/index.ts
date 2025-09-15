/* eslint-disable */
/** interceptor: begin */
export * from '../bean/interceptor.bodyReq.ts';
export * from '../bean/interceptor.bodyRes.ts';
import type { IInterceptorOptionsBodyReq } from '../bean/interceptor.bodyReq.ts';
import type { IInterceptorOptionsBodyRes } from '../bean/interceptor.bodyRes.ts';
import 'vona';
declare module 'vona-module-a-aspect' {
  
    export interface IInterceptorRecordGlobal {
      'a-body:bodyReq': IInterceptorOptionsBodyReq;
'a-body:bodyRes': IInterceptorOptionsBodyRes;
    }

  
}
declare module 'vona-module-a-body' {
  
        export interface InterceptorBodyReq {
          /** @internal */
          get scope(): ScopeModuleABody;
        }

          export interface InterceptorBodyReq {
            get $beanFullName(): 'a-body.interceptor.bodyReq';
            get $onionName(): 'a-body:bodyReq';
          }

        export interface InterceptorBodyRes {
          /** @internal */
          get scope(): ScopeModuleABody;
        }

          export interface InterceptorBodyRes {
            get $beanFullName(): 'a-body.interceptor.bodyRes';
            get $onionName(): 'a-body:bodyRes';
          } 
}
/** interceptor: end */
/** bean: begin */
export * from '../bean/bean.bodyReq.ts';

import 'vona';
declare module 'vona' {
  
  
}
declare module 'vona-module-a-body' {
  
        export interface BeanBodyReq {
          /** @internal */
          get scope(): ScopeModuleABody;
        } 
}
/** bean: end */
/** bean: begin */
import type { BeanBodyReq } from '../bean/bean.bodyReq.ts';
import 'vona';  
declare module 'vona' {
  export interface IBeanRecordGlobal {
    'bodyReq': BeanBodyReq;
  }
}
/** bean: end */
/** service: begin */
export * from '../service/bodyReq.ts';
export * from '../service/bodyRes.ts';

import 'vona';
declare module 'vona-module-a-bean' {
  
    export interface IServiceRecord {
      'a-body:bodyReq': never;
'a-body:bodyRes': never;
    }

  
}
declare module 'vona-module-a-body' {
  
        export interface ServiceBodyReq {
          /** @internal */
          get scope(): ScopeModuleABody;
        }

          export interface ServiceBodyReq {
            get $beanFullName(): 'a-body.service.bodyReq';
            get $onionName(): 'a-body:bodyReq';
          }

        export interface ServiceBodyRes {
          /** @internal */
          get scope(): ScopeModuleABody;
        }

          export interface ServiceBodyRes {
            get $beanFullName(): 'a-body.service.bodyRes';
            get $onionName(): 'a-body:bodyRes';
          } 
}
/** service: end */
/** service: begin */
import type { ServiceBodyReq } from '../service/bodyReq.ts';
import type { ServiceBodyRes } from '../service/bodyRes.ts';
export interface IModuleService {
  'bodyReq': ServiceBodyReq;
'bodyRes': ServiceBodyRes;
}
/** service: end */
/** service: begin */

import 'vona';
declare module 'vona' {
  export interface IBeanRecordGeneral {
    'a-body.service.bodyReq': ServiceBodyReq;
'a-body.service.bodyRes': ServiceBodyRes;
  }
}
/** service: end */
/** scope: begin */
import { BeanScopeBase, type BeanScopeUtil } from 'vona';
import { Scope } from 'vona-module-a-bean';

@Scope()
export class ScopeModuleABody extends BeanScopeBase {}

export interface ScopeModuleABody {
  util: BeanScopeUtil;
service: IModuleService;
}

import 'vona';
declare module 'vona' {
  export interface IBeanScopeRecord {
    'a-body': ScopeModuleABody;
  }

  export interface IBeanScopeContainer {
    body: ScopeModuleABody;
  }
  
  

  
}

/** scope: end */
