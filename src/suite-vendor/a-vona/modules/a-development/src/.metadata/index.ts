/** meta: begin */
export * from '../bean/meta.election.js';

import 'vona';
declare module 'vona' {
  export interface IMetaRecord {
    'a-development:election': never;
  }
}
declare module 'vona-module-a-development' {
  export interface MetaElection {
    /** @internal */
    get scope(): ScopeModuleADevelopment;
  }
}
/** meta: end */
/** meta election: begin */
import type { MetaElection } from '../bean/meta.election.js';
/** meta election: end */
/** monkey: begin */
export * from '../monkey.js';
/** monkey: end */
/** scope: begin */
import type { BeanScopeUtil } from 'vona';
import { BeanScopeBase } from 'vona';
import { Scope } from 'vona-module-a-bean';

@Scope()
export class ScopeModuleADevelopment extends BeanScopeBase {}

export interface ScopeModuleADevelopment {
  util: BeanScopeUtil;
  election: MetaElection;
}

import 'vona';
declare module 'vona' {
  export interface IBeanScopeRecord {
    'a-development': ScopeModuleADevelopment;
  }

  export interface IBeanScopeContainer {
    development: ScopeModuleADevelopment;
  }
}

/** scope: end */
