/** config: begin */
export * from '../config/config.js';
import { config } from '../config/config.js';
/** config: end */
/** scope: begin */
import { BeanScopeBase, Scope, TypeModuleResource } from 'vona';

@Scope()
export class ScopeModuleCmsPluginbacktotop extends BeanScopeBase {}

export interface ScopeModuleCmsPluginbacktotop
  extends TypeModuleResource<typeof config, never, never, never, never, never, never> {}

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
