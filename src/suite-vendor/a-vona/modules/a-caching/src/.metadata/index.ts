import type { BeanScopeUtil } from 'vona';
/** aopMethod: begin */
import type { IAopMethodOptionsCachingGet } from '../bean/aopMethod.cachingGet.ts';
/** aopMethod: end */
/** scope: begin */
import { BeanScopeBase } from 'vona';
import { Scope } from 'vona-module-a-bean';
import 'vona';

import 'vona';

export * from '../bean/aopMethod.cachingGet.ts';
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

@Scope()
export class ScopeModuleACaching extends BeanScopeBase {}

export interface ScopeModuleACaching {
  util: BeanScopeUtil;
}
declare module 'vona' {
  export interface IBeanScopeRecord {
    'a-caching': ScopeModuleACaching;
  }

  export interface IBeanScopeContainer {
    caching: ScopeModuleACaching;
  }

}

/** scope: end */
