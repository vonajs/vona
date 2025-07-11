/* eslint-disable */
/** aopMethod: begin */
export * from '../bean/aopMethod.cachingClear.ts';
export * from '../bean/aopMethod.cachingDel.ts';
export * from '../bean/aopMethod.cachingGet.ts';
export * from '../bean/aopMethod.cachingSet.ts';
import type { IAopMethodOptionsCachingClear } from '../bean/aopMethod.cachingClear.ts';
import type { IAopMethodOptionsCachingDel } from '../bean/aopMethod.cachingDel.ts';
import type { IAopMethodOptionsCachingGet } from '../bean/aopMethod.cachingGet.ts';
import type { IAopMethodOptionsCachingSet } from '../bean/aopMethod.cachingSet.ts';
import 'vona';
declare module 'vona-module-a-aspect' {
  
    export interface IAopMethodRecord {
      'a-caching:cachingClear': IAopMethodOptionsCachingClear;
'a-caching:cachingDel': IAopMethodOptionsCachingDel;
'a-caching:cachingGet': IAopMethodOptionsCachingGet;
'a-caching:cachingSet': IAopMethodOptionsCachingSet;
    }

  
}
declare module 'vona-module-a-caching' {
  
        export interface AopMethodCachingClear {
          /** @internal */
          get scope(): ScopeModuleACaching;
        }

        export interface AopMethodCachingDel {
          /** @internal */
          get scope(): ScopeModuleACaching;
        }

        export interface AopMethodCachingGet {
          /** @internal */
          get scope(): ScopeModuleACaching;
        }

        export interface AopMethodCachingSet {
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
