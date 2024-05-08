import { BeanScopeBase, Scope, TypeLocaleBase, TypeModuleResource } from '@cabloy/core';
import { IModuleLocal } from './locals.js';
import { IModuleModel } from './models.js';
import { config, Errors, locales, constants } from '../config/index.js';

@Scope()
export class ScopeModuleADetail extends BeanScopeBase {}

export interface ScopeModuleADetail
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
    'a-detail': ScopeModuleADetail;
  }

  export interface IBeanScopeConfig {
    'a-detail': ReturnType<typeof config>;
  }

  export interface IBeanScopeLocale {
    'a-detail': typeof locales[TypeLocaleBase];
  }
}
