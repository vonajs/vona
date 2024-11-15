/** controllers: begin */
export * from '../controller/index.js';
/** controllers: end */
/** scope: begin */
import { BeanScopeBase, Scope, TypeModuleResource } from 'vona';

@Scope()
export class ScopeModuleHomeIndex extends BeanScopeBase {}

export interface ScopeModuleHomeIndex extends TypeModuleResource<never, never, never, never, never, never> {}

import 'vona';
declare module 'vona' {
  export interface IBeanScopeRecord {
    'home-index': ScopeModuleHomeIndex;
  }

  export interface IBeanScopeContainer {
    homeIndex: ScopeModuleHomeIndex;
  }
}
/** scope: end */
