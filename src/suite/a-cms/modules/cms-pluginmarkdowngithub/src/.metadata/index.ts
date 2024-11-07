/** scope: begin */
import { BeanScopeBase, Scope, TypeModuleResource } from 'vona';

@Scope()
export class ScopeModuleCmsPluginmarkdowngithub extends BeanScopeBase {}

export interface ScopeModuleCmsPluginmarkdowngithub extends TypeModuleResource<any, any, any, any, any, any> {}

import 'vona';
declare module 'vona' {
  export interface IBeanScopeRecord {
    'cms-pluginmarkdowngithub': ScopeModuleCmsPluginmarkdowngithub;
  }

  export interface BeanScopeContainer {
    cmsPluginmarkdowngithub: ScopeModuleCmsPluginmarkdowngithub;
  }
}
/** scope: end */
