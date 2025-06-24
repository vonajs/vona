/* eslint-disable */
/** aopMethod: begin */
export * from '../bean/aopMethod.cachingGet.ts';
import type { IAopMethodOptionsCachingGet } from '../bean/aopMethod.cachingGet.ts';
import 'vona';
declare module 'vona-module-a-aspect' {
  
    export interface IAopMethodRecord {
      'a-caching:cachingGet': IAopMethodOptionsCachingGet;
    }

  
}
declare module 'vona-module-a-caching' {
  
        export interface AopMethodCachingGet {
          /** @internal */
          get scope(): ScopeModuleACaching;
        } 
}
/** aopMethod: end */
/** scope: begin */
import { BeanScopeBase, type BeanScopeUtil } from 'vona';
import { Scope } from 'vona-module-a-bean';

@Scope()
export class ScopeModuleACaching extends BeanScopeBase {}

export interface ScopeModuleACaching {
  util: BeanScopeUtil;
}

import 'vona';
declare module 'vona' {
  export interface IBeanScopeRecord {
    'a-caching': ScopeModuleACaching;
  }

  export interface IBeanScopeContainer {
    caching: ScopeModuleACaching;
  }
  
  

  
}

/** scope: end */
