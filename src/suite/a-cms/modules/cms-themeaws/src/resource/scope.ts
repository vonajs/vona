import { BeanScopeBase, Scope, TypeLocaleBase, TypeModuleResource } from 'vona';
import { IModuleLocal } from './locals.js';
import { IModuleModel } from './models.js';
import { config, Errors, locales, constants } from '../config/index.js';

@Scope()
export class ScopeModuleCmsThemeaws extends BeanScopeBase {}

export interface ScopeModuleCmsThemeaws
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
    'cms-themeaws': ScopeModuleCmsThemeaws;
  }

  export interface IBeanScopeConfig {
    'cms-themeaws': ReturnType<typeof config>;
  }

  export interface IBeanScopeLocale {
    'cms-themeaws': typeof locales[TypeLocaleBase];
  }
}
