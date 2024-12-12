/** config: begin */
export * from '../config/config.js';
import { config } from '../config/config.js';
/** config: end */
/** scope: begin */
import { BeanScopeBase, Scope, TypeModuleBean, BeanScopeUtil, TypeModuleConfig } from 'vona';

@Scope()
export class ScopeModuleCmsPluginsocialshare extends BeanScopeBase {}

export interface ScopeModuleCmsPluginsocialshare {
  _bean: TypeModuleBean;
  util: BeanScopeUtil;
  config: TypeModuleConfig<typeof config>;
  queue: IModuleQueue;
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
