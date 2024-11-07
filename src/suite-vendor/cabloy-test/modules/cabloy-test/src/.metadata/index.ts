/** scope: begin */
import { BeanScopeBase, Scope, TypeModuleResource } from 'vona';

@Scope()
export class ScopeModuleCabloyTest extends BeanScopeBase {}

export interface ScopeModuleCabloyTest extends TypeModuleResource<any, any, any, any, any, any> {}

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
