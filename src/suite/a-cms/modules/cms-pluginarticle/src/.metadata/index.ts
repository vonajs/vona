/** scope: begin */
import { BeanScopeBase, Scope, TypeModuleResource } from 'vona';

@Scope()
export class ScopeModuleCmsPluginarticle extends BeanScopeBase {}

export interface ScopeModuleCmsPluginarticle extends TypeModuleResource<any, any, any, any, any, any> {}

import 'vona';
declare module 'vona' {
  export interface IBeanScopeRecord {
    'cms-pluginarticle': ScopeModuleCmsPluginarticle;
  }

  export interface BeanScopeContainer {
    cmsPluginarticle: ScopeModuleCmsPluginarticle;
  }
}
/** scope: end */
