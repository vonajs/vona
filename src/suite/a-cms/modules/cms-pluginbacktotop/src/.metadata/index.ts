/** config: begin */
export * from '../config/config.js';
import { config } from '../config/config.js';
/** config: end */
/** scope: begin */
import { BeanScopeBase, Scope, TypeModuleResource } from 'vona';

@Scope()
export class ScopeModuleCmsPluginbacktotop extends BeanScopeBase {}

export interface ScopeModuleCmsPluginbacktotop extends TypeModuleResource<typeof config, any, any, any, any, any> {}

import 'vona';
declare module 'vona' {
  export interface IBeanScopeRecord {
    'cms-pluginbacktotop': ScopeModuleCmsPluginbacktotop;
  }

  export interface BeanBase {
    $scopeCmsPluginbacktotop: ScopeModuleCmsPluginbacktotop;
  }

  export interface IBeanScopeConfig {
    'cms-pluginbacktotop': ReturnType<typeof config>;
  }
}
/** scope: end */
