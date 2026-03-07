/* eslint-disable */
/** ssrSite: begin */
export * from '../bean/ssrSite.front.ts';
import type { ISsrSiteOptionsFront } from '../bean/ssrSite.front.ts';
import 'vona-module-a-ssr';
declare module 'vona-module-a-ssr' {
  
    export interface ISsrSiteRecord {
      'start-sitefront:front': ISsrSiteOptionsFront;
    }

  
}
declare module 'vona-module-start-sitefront' {
  
        export interface SsrSiteFront {
          /** @internal */
          get scope(): ScopeModuleStartSitefront;
        }

          export interface SsrSiteFront {
            get $beanFullName(): 'start-sitefront.ssrSite.front';
            get $onionName(): 'start-sitefront:front';
            get $onionOptions(): ISsrSiteOptionsFront;
          } 
}
/** ssrSite: end */
/** scope: begin */
import { BeanScopeBase, type BeanScopeUtil } from 'vona';
import { Scope } from 'vona-module-a-bean';

@Scope()
export class ScopeModuleStartSitefront extends BeanScopeBase {}

export interface ScopeModuleStartSitefront {
  util: BeanScopeUtil;
}

import 'vona';
declare module 'vona' {
  export interface IBeanScopeRecord {
    'start-sitefront': ScopeModuleStartSitefront;
  }

  export interface IBeanScopeContainer {
    startSitefront: ScopeModuleStartSitefront;
  }
  
  

  

  
}
/** scope: end */
