/** config: begin */
export * from '../config/config.js';
import { config } from '../config/config.js';
/** config: end */
/** scope: begin */
import { BeanScopeBase, TypeModuleBean, BeanScopeUtil, TypeModuleConfig } from 'vona';
import { Scope } from 'vona-module-a-bean';

@Scope()
export class ScopeModuleCmsPlugintrack extends BeanScopeBase {}

export interface ScopeModuleCmsPlugintrack {
  _bean: TypeModuleBean;
  util: BeanScopeUtil;
  config: TypeModuleConfig<typeof config>;
}

import 'vona';
declare module 'vona' {
  export interface IBeanScopeRecord {
    'cms-plugintrack': ScopeModuleCmsPlugintrack;
  }

  export interface IBeanScopeContainer {
    cmsPlugintrack: ScopeModuleCmsPlugintrack;
  }

  export interface IBeanScopeConfig {
    'cms-plugintrack': ReturnType<typeof config>;
  }
}

/** scope: end */
