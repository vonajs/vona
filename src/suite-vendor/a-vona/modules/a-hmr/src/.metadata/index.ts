/* eslint-disable */
/** meta: begin */
export * from '../bean/meta.election.ts';

import 'vona-module-a-meta';
declare module 'vona-module-a-meta' {
  
    export interface IMetaRecord {
      'a-hmr:election': never;
    }

  
}
declare module 'vona-module-a-hmr' {
  
        export interface MetaElection {
          /** @internal */
          get scope(): ScopeModuleAHmr;
        }

          export interface MetaElection {
            get $beanFullName(): 'a-hmr.meta.election';
            get $onionName(): 'a-hmr:election';
            
          } 
}
/** meta: end */
/** meta election: begin */
import type { MetaElection } from '../bean/meta.election.ts';
/** meta election: end */
/** scope: begin */
import { BeanScopeBase, type BeanScopeUtil } from 'vona';
import { Scope } from 'vona-module-a-bean';

@Scope()
export class ScopeModuleAHmr extends BeanScopeBase {}

export interface ScopeModuleAHmr {
  util: BeanScopeUtil;
election: MetaElection;
}

import 'vona';
declare module 'vona' {
  export interface IBeanScopeRecord {
    'a-hmr': ScopeModuleAHmr;
  }

  export interface IBeanScopeContainer {
    hmr: ScopeModuleAHmr;
  }
  
  

  

  
}

/** scope: end */
