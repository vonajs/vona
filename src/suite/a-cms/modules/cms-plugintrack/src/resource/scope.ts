import { BeanScopeBase, Scope, TypeLocaleBase, TypeModuleResource } from 'vona';
import { IModuleLocal } from './locals.js';
import { IModuleModel } from './models.js';
import { config, Errors, locales, constants } from '../config/index.js';

@Scope()
export class ScopeModuleCmsPlugintrack extends BeanScopeBase {}

export interface ScopeModuleCmsPlugintrack
  extends TypeModuleResource<
    IModuleLocal,
    IModuleModel,
    typeof config,
    typeof Errors,
    typeof locales[TypeLocaleBase],
    typeof constants
  > {}

declare module 'vona' {
  export interface IBeanScopeRecord {
    'cms-plugintrack': ScopeModuleCmsPlugintrack;
  }

  export interface IBeanScopeConfig {
    'cms-plugintrack': ReturnType<typeof config>;
  }

  export interface IBeanScopeLocale {
    'cms-plugintrack': typeof locales[TypeLocaleBase];
  }
}
