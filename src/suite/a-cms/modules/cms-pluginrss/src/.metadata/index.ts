/** config: begin */
export * from '../config/config.js';
import { config } from '../config/config.js';
/** config: end */
/** scope: begin */
import { BeanScopeBase, TypeModuleBean, BeanScopeUtil, TypeModuleConfig } from 'vona';
import { Scope } from 'vona-module-a-bean';

@Scope()
export class ScopeModuleCmsPluginrss extends BeanScopeBase {}

export interface ScopeModuleCmsPluginrss {
  _bean: TypeModuleBean;
  util: BeanScopeUtil;
  config: TypeModuleConfig<typeof config>;
}

import 'vona';
declare module 'vona' {
  export interface IBeanScopeRecord {
    'cms-pluginrss': ScopeModuleCmsPluginrss;
  }

  export interface IBeanScopeContainer {
    cmsPluginrss: ScopeModuleCmsPluginrss;
  }

  export interface IBeanScopeConfig {
    'cms-pluginrss': ReturnType<typeof config>;
  }
}

/** scope: end */
