/** scope: begin */
import { BeanScopeBase, Scope, TypeModuleResource } from 'vona';

@Scope()
export class ScopeModuleASwagger extends BeanScopeBase {}

export interface ScopeModuleASwagger extends TypeModuleResource<never, never, never, never, never, never, never> {}

import 'vona';
declare module 'vona' {
  export interface IBeanScopeRecord {
    'a-swagger': ScopeModuleASwagger;
  }

  export interface IBeanScopeContainer {
    swagger: ScopeModuleASwagger;
  }
}

/** scope: end */
