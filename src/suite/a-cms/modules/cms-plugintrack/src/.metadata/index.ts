/** config: begin */
export * from '../config/config.js';
import { config } from '../config/config.js';
/** config: end */
/** scope: begin */
import { BeanScopeBase, Scope, TypeModuleResource } from 'vona';

@Scope()
export class ScopeModuleCmsPlugintrack extends BeanScopeBase {}

export interface ScopeModuleCmsPlugintrack extends TypeModuleResource<typeof config, any, any, any, any, any> {}

import 'vona';
declare module 'vona' {
  export interface IBeanScopeRecord {
    'cms-plugintrack': ScopeModuleCmsPlugintrack;
  }

  export interface BeanBase {
    $scopeCmsPlugintrack: ScopeModuleCmsPlugintrack;
  }

  export interface IBeanScopeConfig {
    'cms-plugintrack': ReturnType<typeof config>;
  }
}
/** scope: end */
