import { BeanScopeBase, Scope, TypeModuleResource } from '@cabloy/core';
import { IModuleLocal } from './locals.js';
import { IModuleModel } from './models.js';
import { config, Errors, locales, constants } from '../config/index.js';

@Scope()
export class ScopeModuleCmsPluginbase extends BeanScopeBase {}

export interface ScopeModuleCmsPluginbase
  extends TypeModuleResource<
    IModuleLocal,
    IModuleModel,
    typeof config,
    typeof Errors,
    typeof locales,
    typeof constants
  > {}

declare module '@cabloy/core' {
  export interface IBeanScopeRecord {
    'cms-pluginbase': ScopeModuleCmsPluginbase;
  }

  export interface IBeanScopeConfig {
    'cms-pluginbase': ReturnType<typeof config>;
  }
}
