import { BeanScopeBase, Scope, TypeLocaleBase, TypeModuleResource } from '@cabloy/core';
import { IModuleLocal } from './locals.js';
import { IModuleModel } from './models.js';
import { config, Errors, locales, constants } from '../config/index.js';

@Scope()
export class ScopeModuleAFields extends BeanScopeBase {}

export interface ScopeModuleAFields
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
    'a-fields': ScopeModuleAFields;
  }

  export interface IBeanScopeConfig {
    'a-fields': ReturnType<typeof config>;
  }

  export interface IBeanScopeLocale {
    'a-fields': typeof locales[TypeLocaleBase];
  }
}
