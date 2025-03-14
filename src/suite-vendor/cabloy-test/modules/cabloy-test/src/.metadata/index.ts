import type { BeanScopeUtil } from 'vona';
import type { IDecoratorControllerOptions } from 'vona-module-a-web';
/** meta: end */
/** meta status: begin */
import type { MetaStatus } from '../bean/meta.status.ts';

/** controller: end */
/** scope: begin */
import { BeanScopeBase } from 'vona';
import { Scope } from 'vona-module-a-bean';
/** meta: begin */
import 'vona';

import 'vona';

export * from '../bean/meta.status.ts';
declare module 'vona' {

  export interface IMetaRecord {
    'cabloy-test:status': never;
  }

}
declare module 'vona-module-cabloy-test' {

  export interface MetaStatus {
    /** @internal */
    get scope(): ScopeModuleCabloyTest;
  }
}
/** meta status: end */
/** controller: begin */
export * from '../controller/status.ts';
declare module 'vona-module-a-web' {

  export interface IControllerRecord {
    'cabloy-test:status': IDecoratorControllerOptions;
  }

}
declare module 'vona-module-cabloy-test' {

  export interface ControllerStatus {
    /** @internal */
    get scope(): ScopeModuleCabloyTest;
  }
}
/** controller: end */
/** controller: begin */
declare module 'vona-module-a-web' {
  export interface IApiPathPostRecord {
    '/cabloy/test/status': '/cabloy/test/status';
  }

}

@Scope()
export class ScopeModuleCabloyTest extends BeanScopeBase {}

export interface ScopeModuleCabloyTest {
  util: BeanScopeUtil;
  status: MetaStatus;
}
declare module 'vona' {
  export interface IBeanScopeRecord {
    'cabloy-test': ScopeModuleCabloyTest;
  }

  export interface IBeanScopeContainer {
    cabloyTest: ScopeModuleCabloyTest;
  }

}

/** scope: end */
