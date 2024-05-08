import { BeanScopeBase, Scope, TypeLocaleBase, TypeModuleResource } from '@cabloy/core';
import { IModuleLocal } from './locals.js';
import { IModuleModel } from './models.js';
import { config, Errors, locales, constants } from '../config/index.js';

@Scope()
export class ScopeModuleAOauth extends BeanScopeBase {}

export interface ScopeModuleAOauth
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
    'a-oauth': ScopeModuleAOauth;
  }

  export interface IBeanScopeConfig {
    'a-oauth': ReturnType<typeof config>;
  }

  export interface IBeanScopeLocale {
    'a-oauth': typeof locales[TypeLocaleBase];
  }
}
