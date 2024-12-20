/** meta: begin */
export * from '../bean/meta.status.js';

import 'vona';
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
/** meta: end */
/** meta status: begin */
import { MetaStatus } from '../bean/meta.status.js';
/** meta status: end */
/** controller: begin */
export * from '../controller/status.js';

import { IDecoratorControllerOptions } from 'vona-module-a-web';
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
/** controller: end */
/** scope: begin */
import { BeanScopeBase, TypeModuleBean, BeanScopeUtil } from 'vona';
import { Scope } from 'vona-module-a-bean';

@Scope()
export class ScopeModuleCabloyTest extends BeanScopeBase {}

export interface ScopeModuleCabloyTest {
  _bean: TypeModuleBean;
  util: BeanScopeUtil;
  status: MetaStatus;
}

import 'vona';
declare module 'vona' {
  export interface IBeanScopeRecord {
    'cabloy-test': ScopeModuleCabloyTest;
  }

  export interface IBeanScopeContainer {
    cabloyTest: ScopeModuleCabloyTest;
  }
}

/** scope: end */
