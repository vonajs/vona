/** scope: begin */
import { BeanScopeBase, Scope, TypeModuleResource } from 'vona';

@Scope()
export class ScopeModuleCmsPluginmarkdowngithub extends BeanScopeBase {}

export interface ScopeModuleCmsPluginmarkdowngithub
  extends TypeModuleResource<never, never, never, never, never, never, never, never, never> {}

import 'vona';
declare module 'vona' {
  export interface IBeanScopeRecord {
    'cms-pluginmarkdowngithub': ScopeModuleCmsPluginmarkdowngithub;
  }

  export interface IBeanScopeContainer {
    cmsPluginmarkdowngithub: ScopeModuleCmsPluginmarkdowngithub;
  }
}

/** scope: end */
