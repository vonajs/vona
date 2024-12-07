/** scope: begin */
import { BeanScopeBase, Scope, TypeModuleResource } from 'vona';

@Scope()
export class ScopeModuleCmsPluginarticle extends BeanScopeBase {}

export interface ScopeModuleCmsPluginarticle
  extends TypeModuleResource<never, never, never, never, never, never, never, never, never> {}

import 'vona';
declare module 'vona' {
  export interface IBeanScopeRecord {
    'cms-pluginarticle': ScopeModuleCmsPluginarticle;
  }

  export interface IBeanScopeContainer {
    cmsPluginarticle: ScopeModuleCmsPluginarticle;
  }
}

/** scope: end */
