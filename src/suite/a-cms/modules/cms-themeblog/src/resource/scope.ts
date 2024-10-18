import { BeanScopeBase, Scope, TypeLocaleBase, TypeModuleResource } from 'vona';
import { IModuleLocal } from './locals.js';
import { IModuleModel } from './models.js';
import { config, Errors, locales, constants } from '../config/index.js';

@Scope()
export class ScopeModuleCmsThemeblog extends BeanScopeBase {}

export interface ScopeModuleCmsThemeblog
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
    'cms-themeblog': ScopeModuleCmsThemeblog;
  }

  export interface IBeanScopeConfig {
    'cms-themeblog': ReturnType<typeof config>;
  }

  export interface IBeanScopeLocale {
    'cms-themeblog': typeof locales[TypeLocaleBase];
  }
}
