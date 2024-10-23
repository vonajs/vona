import { BeanScopeBase, Scope, TypeLocaleBase, TypeModuleResource } from 'vona';
import { IModuleService } from './locals.js';
import { IModuleModel } from './models.js';
import { config, Errors, locales, constants } from '../config/index.js';

@Scope()
export class ScopeModuleCmsPluginsidebar extends BeanScopeBase {}

export interface ScopeModuleCmsPluginsidebar
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
    'cms-pluginsidebar': ScopeModuleCmsPluginsidebar;
  }

  export interface IBeanScopeConfig {
    'cms-pluginsidebar': ReturnType<typeof config>;
  }

  export interface IBeanScopeLocale {
    'cms-pluginsidebar': (typeof locales)[TypeLocaleBase];
  }
}
