/** scope: begin */
import { BeanScopeBase, Scope, TypeModuleResource } from 'vona';

@Scope()
export class ScopeModuleHomeBase extends BeanScopeBase {}

export interface ScopeModuleHomeBase extends TypeModuleResource<any, any, any, any, any, any> {}

import 'vona';
declare module 'vona' {
  export interface IBeanScopeRecord {
    'home-base': ScopeModuleHomeBase;
  }

  export interface IBeanScopeContainer {
    homeBase: ScopeModuleHomeBase;
  }
}
/** scope: end */
