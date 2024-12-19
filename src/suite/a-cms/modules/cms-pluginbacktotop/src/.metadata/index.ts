/** config: begin */
export * from '../config/config.js';
import { config } from '../config/config.js';
/** config: end */
/** scope: begin */
import { BeanScopeBase, TypeModuleBean, BeanScopeUtil, TypeModuleConfig } from 'vona';
import { Scope } from 'vona-module-a-bean';

@Scope()
export class ScopeModuleCmsPluginbacktotop extends BeanScopeBase {}

export interface ScopeModuleCmsPluginbacktotop {
  _bean: TypeModuleBean;
  util: BeanScopeUtil;
  config: TypeModuleConfig<typeof config>;
}

import 'vona';
declare module 'vona' {
  export interface IBeanScopeRecord {
    'cms-pluginbacktotop': ScopeModuleCmsPluginbacktotop;
  }

  export interface IBeanScopeContainer {
    cmsPluginbacktotop: ScopeModuleCmsPluginbacktotop;
  }

  export interface IBeanScopeConfig {
    'cms-pluginbacktotop': ReturnType<typeof config>;
  }
}

/** scope: end */
