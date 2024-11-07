/** scope: begin */
import { BeanScopeBase, Scope, TypeModuleResource } from 'vona';

@Scope()
export class ScopeModuleAVona extends BeanScopeBase {}

export interface ScopeModuleAVona extends TypeModuleResource<any, any, any, any, any, any> {}

import 'vona';
declare module 'vona' {
  export interface IBeanScopeRecord {
    'a-vona': ScopeModuleAVona;
  }

  export interface IBeanScopeContainer {
    vona: ScopeModuleAVona;
  }
}
/** scope: end */
