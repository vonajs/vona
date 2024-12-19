/** config: begin */
export * from '../config/config.js';
import { config } from '../config/config.js';
/** config: end */
/** scope: begin */
import { BeanScopeBase, TypeModuleBean, BeanScopeUtil, TypeModuleConfig } from 'vona';
import { Scope } from 'vona-module-a-bean';

@Scope()
export class ScopeModuleCmsPluginsocialshare extends BeanScopeBase {}

export interface ScopeModuleCmsPluginsocialshare {
  _bean: TypeModuleBean;
  util: BeanScopeUtil;
  config: TypeModuleConfig<typeof config>;
}

import 'vona';
declare module 'vona' {
  export interface IBeanScopeRecord {
    'cms-pluginsocialshare': ScopeModuleCmsPluginsocialshare;
  }

  export interface IBeanScopeContainer {
    cmsPluginsocialshare: ScopeModuleCmsPluginsocialshare;
  }

  export interface IBeanScopeConfig {
    'cms-pluginsocialshare': ReturnType<typeof config>;
  }
}

/** scope: end */
