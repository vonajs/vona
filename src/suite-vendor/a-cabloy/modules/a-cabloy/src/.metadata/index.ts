/** scope: begin */
import { BeanScopeBase, Scope, TypeModuleResource } from 'vona';

@Scope()
export class ScopeModuleACabloy extends BeanScopeBase {}

export interface ScopeModuleACabloy extends TypeModuleResource<never, never, never, never, never, never> {}

import 'vona';
declare module 'vona' {
  export interface IBeanScopeRecord {
    'a-cabloy': ScopeModuleACabloy;
  }

  export interface IBeanScopeContainer {
    cabloy: ScopeModuleACabloy;
  }
}
/** scope: end */
