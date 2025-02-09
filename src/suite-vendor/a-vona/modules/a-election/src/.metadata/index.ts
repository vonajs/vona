/** service: begin */
export * from '../service/election.js';

import 'vona';
declare module 'vona-module-a-web' {
  export interface IServiceRecord {
    'a-election:election': never;
  }
}
declare module 'vona-module-a-election' {
  export interface ServiceElection {
    /** @internal */
    get scope(): ScopeModuleAElection;
  }
}
/** service: end */
/** service: begin */
import { ServiceElection } from '../service/election.js';
export interface IModuleService {
  election: ServiceElection;
}
/** service: end */
/** service: begin */

import 'vona';
declare module 'vona' {
  export interface IBeanRecordGeneral {
    'a-election.service.election': ServiceElection;
  }
}
/** service: end */
/** scope: begin */
import { BeanScopeBase, BeanScopeUtil } from 'vona';
import { Scope } from 'vona-module-a-bean';

@Scope()
export class ScopeModuleAElection extends BeanScopeBase {}

export interface ScopeModuleAElection {
  util: BeanScopeUtil;
  service: IModuleService;
}

import 'vona';
declare module 'vona' {
  export interface IBeanScopeRecord {
    'a-election': ScopeModuleAElection;
  }

  export interface IBeanScopeContainer {
    election: ScopeModuleAElection;
  }
}

/** scope: end */
