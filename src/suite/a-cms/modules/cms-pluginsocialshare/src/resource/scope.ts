import { BeanScopeBase, Scope, TypeModuleResource } from '@cabloy/core';
import { IModuleLocal } from './locals.js';
import { IModuleModel } from './models.js';
import { config, Errors, locales, constants } from '../config/index.js';

@Scope()
export class ScopeModuleCmsPluginsocialshare extends BeanScopeBase {}

export interface ScopeModuleCmsPluginsocialshare
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
    'cms-pluginsocialshare': ScopeModuleCmsPluginsocialshare;
  }

  export interface IBeanScopeConfig {
    'cms-pluginsocialshare': ReturnType<typeof config>;
  }
}
