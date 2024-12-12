/** scope: begin */
import { BeanScopeBase, Scope, TypeModuleBean, BeanScopeUtil } from 'vona';

@Scope()
export class ScopeModuleCabloyTest extends BeanScopeBase {}

export interface ScopeModuleCabloyTest {
  _bean: TypeModuleBean;
  util: BeanScopeUtil;
  queue: IModuleQueue;
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
