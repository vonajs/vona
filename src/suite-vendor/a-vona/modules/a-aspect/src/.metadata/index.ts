/* eslint-disable */
/** hmr: begin */
export * from '../bean/hmr.aop.ts';
export * from '../bean/hmr.aopMethod.ts';

import 'vona';
declare module 'vona' {
  
    export interface IHmrRecord {
      'a-aspect:aop': never;
'a-aspect:aopMethod': never;
    }

  
}
declare module 'vona-module-a-aspect' {
  
        export interface HmrAop {
          /** @internal */
          get scope(): ScopeModuleAAspect;
        }

          export interface HmrAop {
            get $beanFullName(): 'a-aspect.hmr.aop';
            get $onionName(): 'a-aspect:aop';
            
          }

        export interface HmrAopMethod {
          /** @internal */
          get scope(): ScopeModuleAAspect;
        }

          export interface HmrAopMethod {
            get $beanFullName(): 'a-aspect.hmr.aopMethod';
            get $onionName(): 'a-aspect:aopMethod';
            
          } 
}
/** hmr: end */
/** scope: begin */
import { BeanScopeBase, type BeanScopeUtil } from 'vona';
import { Scope } from 'vona-module-a-bean';

@Scope()
export class ScopeModuleAAspect extends BeanScopeBase {}

export interface ScopeModuleAAspect {
  util: BeanScopeUtil;
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
