/** scope: begin */
import { BeanScopeBase, Scope, TypeModuleResource } from 'vona';

@Scope()
export class ScopeModuleVonaTest extends BeanScopeBase {}

export interface ScopeModuleVonaTest extends TypeModuleResource<any, any, any, any, any, any> {}

import 'vona';
declare module 'vona' {
  export interface IBeanScopeRecord {
    'vona-test': ScopeModuleVonaTest;
  }

  export interface BeanScopeContainer {
    vonaTest: ScopeModuleVonaTest;
  }
}
/** scope: end */
