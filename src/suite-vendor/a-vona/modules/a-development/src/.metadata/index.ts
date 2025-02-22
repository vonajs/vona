/** monkey: end */
/** scope: begin */
import type { BeanScopeUtil } from 'vona';
/** meta: end */
/** meta election: begin */
import type { MetaElection } from '../bean/meta.election.ts';
import { BeanScopeBase } from 'vona';
import { Scope } from 'vona-module-a-bean';
/** meta: begin */
import 'vona';

import 'vona';

export * from '../bean/meta.election.ts';
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
/** meta election: end */
/** monkey: begin */
export * from '../monkey.ts';

@Scope()
export class ScopeModuleADevelopment extends BeanScopeBase {}

export interface ScopeModuleADevelopment {
  util: BeanScopeUtil;
  election: MetaElection;
}
declare module 'vona' {
  export interface IBeanScopeRecord {
    'a-development': ScopeModuleADevelopment;
  }

  export interface IBeanScopeContainer {
    development: ScopeModuleADevelopment;
  }
}

/** scope: end */
