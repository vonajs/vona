import { BeanScopeBase, Scope, TypeLocaleBase, TypeModuleResource } from 'vona';
import { IModuleService } from './locals.js';
import { IModuleModel } from './models.js';
import { config, Errors, locales, constants } from '../config/index.js';

@Scope()
export class ScopeModuleCmsPluginsubmit extends BeanScopeBase {}

export interface ScopeModuleCmsPluginsubmit
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
    'cms-pluginsubmit': ScopeModuleCmsPluginsubmit;
  }

  export interface IBeanScopeConfig {
    'cms-pluginsubmit': ReturnType<typeof config>;
  }

  export interface IBeanScopeLocale {
    'cms-pluginsubmit': (typeof locales)[TypeLocaleBase];
  }
}
