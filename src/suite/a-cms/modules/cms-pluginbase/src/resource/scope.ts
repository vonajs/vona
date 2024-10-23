import { BeanScopeBase, Scope, TypeLocaleBase, TypeModuleResource } from 'vona';
import { IModuleService } from './locals.js';
import { IModuleModel } from './models.js';
import { config, Errors, locales, constants } from '../config/index.js';

@Scope()
export class ScopeModuleCmsPluginbase extends BeanScopeBase {}

export interface ScopeModuleCmsPluginbase
  extends TypeModuleResource<
    IModuleService,
    IModuleModel,
    typeof config,
    typeof Errors,
    (typeof locales)[TypeLocaleBase],
    typeof constants
  > {}

declare module 'vona' {
  export interface IBeanScopeRecord {
    'cms-pluginbase': ScopeModuleCmsPluginbase;
  }

  export interface IBeanScopeConfig {
    'cms-pluginbase': ReturnType<typeof config>;
  }

  export interface IBeanScopeLocale {
    'cms-pluginbase': (typeof locales)[TypeLocaleBase];
  }
}
