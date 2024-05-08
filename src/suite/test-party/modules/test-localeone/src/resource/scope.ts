import { BeanScopeBase, Scope, TypeLocaleBase, TypeModuleResource } from '@cabloy/core';
import { IModuleLocal } from './locals.js';
import { IModuleModel } from './models.js';
import { config, Errors, locales, constants } from '../config/index.js';

@Scope()
export class ScopeModuleTestLocaleone extends BeanScopeBase {}

export interface ScopeModuleTestLocaleone
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
    'test-localeone': ScopeModuleTestLocaleone;
  }

  export interface IBeanScopeConfig {
    'test-localeone': ReturnType<typeof config>;
  }

  export interface IBeanScopeLocale {
    'test-localeone': typeof locales[TypeLocaleBase];
  }
}
