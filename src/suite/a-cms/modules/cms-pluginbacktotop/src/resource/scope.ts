import { BeanScopeBase, Scope, TypeLocaleBase, TypeModuleResource } from 'vona';
import { IModuleLocal } from './locals.js';
import { IModuleModel } from './models.js';
import { config, Errors, locales, constants } from '../config/index.js';

@Scope()
export class ScopeModuleCmsPluginbacktotop extends BeanScopeBase {}

export interface ScopeModuleCmsPluginbacktotop
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
    'cms-pluginbacktotop': ScopeModuleCmsPluginbacktotop;
  }

  export interface IBeanScopeConfig {
    'cms-pluginbacktotop': ReturnType<typeof config>;
  }

  export interface IBeanScopeLocale {
    'cms-pluginbacktotop': typeof locales[TypeLocaleBase];
  }
}
