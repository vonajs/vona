import { BeanScopeBase, Scope, TypeLocaleBase, TypeModuleResource } from '@cabloy/core';
import { IModuleLocal } from './locals.js';
import { IModuleModel } from './models.js';
import { config, Errors, locales, constants } from '../config/index.js';

@Scope()
export class ScopeModuleTestParty extends BeanScopeBase {}

export interface ScopeModuleTestParty
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
    'test-party': ScopeModuleTestParty;
  }

  export interface IBeanScopeConfig {
    'test-party': ReturnType<typeof config>;
  }

  export interface IBeanScopeLocale {
    'test-party': typeof locales[TypeLocaleBase];
  }
}
