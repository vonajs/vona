/** scope: begin */
import { BeanScopeBase, Scope, TypeModuleBean, BeanScopeUtil } from 'vona';

@Scope()
export class ScopeModuleCmsPluginmarkdowngithub extends BeanScopeBase {}

export interface ScopeModuleCmsPluginmarkdowngithub {
  _bean: TypeModuleBean;
  util: BeanScopeUtil;
  queue: IModuleQueue;
}

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
