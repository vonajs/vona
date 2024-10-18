import { BeanScopeBase, Scope, TypeLocaleBase, TypeModuleResource } from 'vona';
import { IModuleLocal } from './locals.js';
import { IModuleModel } from './models.js';
import { config, Errors, locales, constants } from '../config/index.js';

@Scope()
export class ScopeModuleCmsSitedocumentation extends BeanScopeBase {}

export interface ScopeModuleCmsSitedocumentation
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
    'cms-sitedocumentation': ScopeModuleCmsSitedocumentation;
  }

  export interface IBeanScopeConfig {
    'cms-sitedocumentation': ReturnType<typeof config>;
  }

  export interface IBeanScopeLocale {
    'cms-sitedocumentation': typeof locales[TypeLocaleBase];
  }
}
