/* eslint-disable */
/** service: begin */
export * from '../service/watch.ts';

import 'vona-module-a-bean';
declare module 'vona-module-a-bean' {
  
    export interface IServiceRecord {
      'a-hmr:watch': never;
    }

  
}
declare module 'vona-module-a-hmr' {
  
        export interface ServiceWatch {
          /** @internal */
          get scope(): ScopeModuleAHmr;
        }

          export interface ServiceWatch {
            get $beanFullName(): 'a-hmr.service.watch';
            get $onionName(): 'a-hmr:watch';
            
          } 
}
/** service: end */
/** service: begin */
import type { ServiceWatch } from '../service/watch.ts';
export interface IModuleService {
  'watch': ServiceWatch;
}
/** service: end */
/** service: begin */

import 'vona';
declare module 'vona' {
  export interface IBeanRecordGeneral {
    'a-hmr.service.watch': ServiceWatch;
  }
}
/** service: end */
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
/** monkey: begin */
export * from '../monkey.ts';
/** monkey: end */
/** scope: begin */
import { BeanScopeBase, type BeanScopeUtil } from 'vona';
import { Scope } from 'vona-module-a-bean';

@Scope()
export class ScopeModuleAHmr extends BeanScopeBase {}

export interface ScopeModuleAHmr {
  util: BeanScopeUtil;
service: IModuleService;
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
