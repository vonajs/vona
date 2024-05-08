import { BeanScopeBase, Scope, TypeLocaleBase, TypeModuleResource } from '@cabloy/core';
import { IModuleLocal } from './locals.js';
import { IModuleModel } from './models.js';
import { config, Errors, locales, constants } from '../config/index.js';

@Scope()
export class ScopeModuleCmsSitecommunity extends BeanScopeBase {}

export interface ScopeModuleCmsSitecommunity
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
    'cms-sitecommunity': ScopeModuleCmsSitecommunity;
  }

  export interface IBeanScopeConfig {
    'cms-sitecommunity': ReturnType<typeof config>;
  }

  export interface IBeanScopeLocale {
    'cms-sitecommunity': typeof locales[TypeLocaleBase];
  }
}
