import { BeanScopeBase, Scope, TypeLocaleBase, TypeModuleResource } from 'vona';
import { IModuleService } from './locals.js';
import { IModuleModel } from './models.js';
import { config, Errors, locales, constants } from '../config/index.js';

@Scope()
export class ScopeModuleCmsPluginuser extends BeanScopeBase {}

export interface ScopeModuleCmsPluginuser
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
    'cms-pluginuser': ScopeModuleCmsPluginuser;
  }

  export interface IBeanScopeConfig {
    'cms-pluginuser': ReturnType<typeof config>;
  }

  export interface IBeanScopeLocale {
    'cms-pluginuser': (typeof locales)[TypeLocaleBase];
  }
}
