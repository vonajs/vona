import { BeanScopeBase, Scope, TypeLocaleBase, TypeModuleResource } from '@cabloy/core';
import { IModuleLocal } from './locals.js';
import { IModuleModel } from './models.js';
import { config, Errors, locales, constants } from '../config/index.js';

@Scope()
export class ScopeModuleACli extends BeanScopeBase {}

export interface ScopeModuleACli
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
    'a-cli': ScopeModuleACli;
  }

  export interface IBeanScopeConfig {
    'a-cli': ReturnType<typeof config>;
  }

  export interface IBeanScopeLocale {
    'a-cli': typeof locales[TypeLocaleBase];
  }
}
