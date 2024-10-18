import { BeanScopeBase, Scope, TypeLocaleBase, TypeModuleResource } from 'vona';
import { IModuleLocal } from './locals.js';
import { IModuleModel } from './models.js';
import { config, Errors, locales, constants } from '../config/index.js';

@Scope()
export class ScopeModuleCmsThemecommunity extends BeanScopeBase {}

export interface ScopeModuleCmsThemecommunity
  extends TypeModuleResource<
    IModuleLocal,
    IModuleModel,
    typeof config,
    typeof Errors,
    typeof locales[TypeLocaleBase],
    typeof constants
  > {}

declare module '@cabloy/core' {
  export interface IBeanScopeRecord {
    'cms-themecommunity': ScopeModuleCmsThemecommunity;
  }

  export interface IBeanScopeConfig {
    'cms-themecommunity': ReturnType<typeof config>;
  }

  export interface IBeanScopeLocale {
    'cms-themecommunity': typeof locales[TypeLocaleBase];
  }
}
