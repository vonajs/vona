import { BeanScopeBase, Scope, TypeLocaleBase, TypeModuleResource } from '@cabloy/core';
import { IModuleLocal } from './locals.js';
import { IModuleModel } from './models.js';
import { config, Errors, locales, constants } from '../config/index.js';

@Scope()
export class ScopeModuleAProgress extends BeanScopeBase {}

export interface ScopeModuleAProgress
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
    'a-progress': ScopeModuleAProgress;
  }

  export interface IBeanScopeConfig {
    'a-progress': ReturnType<typeof config>;
  }

  export interface IBeanScopeLocale {
    'a-progress': typeof locales[TypeLocaleBase];
  }
}
