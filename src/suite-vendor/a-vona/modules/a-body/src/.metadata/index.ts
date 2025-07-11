/* eslint-disable */
/** interceptor: begin */
export * from '../bean/interceptor.body.ts';
import type { IInterceptorOptionsBody } from '../bean/interceptor.body.ts';
import 'vona';
declare module 'vona-module-a-aspect' {
  
    export interface IInterceptorRecordGlobal {
      'a-body:body': IInterceptorOptionsBody;
    }

  
}
declare module 'vona-module-a-body' {
  
        export interface InterceptorBody {
          /** @internal */
          get scope(): ScopeModuleABody;
        }

          export interface InterceptorBody {
            get $beanFullName(): 'a-body.interceptor.body';
            get $onionName(): 'a-body:body';
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
