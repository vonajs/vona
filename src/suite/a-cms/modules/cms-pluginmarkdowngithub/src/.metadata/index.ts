/** scope: begin */
import { BeanScopeBase, TypeModuleBean, BeanScopeUtil } from 'vona';
import { Scope } from 'vona-module-a-bean';

@Scope()
export class ScopeModuleCmsPluginmarkdowngithub extends BeanScopeBase {}

export interface ScopeModuleCmsPluginmarkdowngithub {
  _bean: TypeModuleBean;
  util: BeanScopeUtil;
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
