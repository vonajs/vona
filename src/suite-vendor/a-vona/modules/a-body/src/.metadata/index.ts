/* eslint-disable */
/** interceptor: begin */
export * from '../bean/interceptor.bodyRes.ts';
import type { IInterceptorOptionsBodyRes } from '../bean/interceptor.bodyRes.ts';
import 'vona';
declare module 'vona-module-a-aspect' {
  
    export interface IInterceptorRecordGlobal {
      'a-body:bodyRes': IInterceptorOptionsBodyRes;
    }

  
}
declare module 'vona-module-a-body' {
  
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
export * from '../bean/bean.body.ts';

import 'vona';
declare module 'vona' {
  
  
}
declare module 'vona-module-a-body' {
  
        export interface BeanBody {
          /** @internal */
          get scope(): ScopeModuleABody;
        } 
}
/** bean: end */
/** bean: begin */
import type { BeanBody } from '../bean/bean.body.ts';
import 'vona';  
declare module 'vona' {
  export interface IBeanRecordGlobal {
    'body': BeanBody;
  }
}
/** bean: end */
/** service: begin */
export * from '../service/body.ts';

import 'vona';
declare module 'vona-module-a-bean' {
  
    export interface IServiceRecord {
      'a-body:body': never;
    }

  
}
declare module 'vona-module-a-body' {
  
        export interface ServiceBody {
          /** @internal */
          get scope(): ScopeModuleABody;
        }

          export interface ServiceBody {
            get $beanFullName(): 'a-body.service.body';
            get $onionName(): 'a-body:body';
          } 
}
/** service: end */
/** service: begin */
import type { ServiceBody } from '../service/body.ts';
export interface IModuleService {
  'body': ServiceBody;
}
/** service: end */
/** service: begin */

import 'vona';
declare module 'vona' {
  export interface IBeanRecordGeneral {
    'a-body.service.body': ServiceBody;
  }
}
/** service: end */
/** config: begin */
export * from '../config/config.ts';
import type { config } from '../config/config.ts';
/** config: end */
/** scope: begin */
import { BeanScopeBase, type BeanScopeUtil, type TypeModuleConfig } from 'vona';
import { Scope } from 'vona-module-a-bean';

@Scope()
export class ScopeModuleABody extends BeanScopeBase {}

export interface ScopeModuleABody {
  util: BeanScopeUtil;
config: TypeModuleConfig<typeof config>;
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
  
  export interface IBeanScopeConfig {
    'a-body': ReturnType<typeof config>;
  }

  
}

/** scope: end */
