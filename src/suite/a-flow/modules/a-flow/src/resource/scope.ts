import { BeanScopeBase, Scope, TypeLocaleBase, TypeModuleResource } from '@cabloy/core';
import { IModuleLocal } from './locals.js';
import { IModuleModel } from './models.js';
import { config, Errors, locales, constants } from '../config/index.js';

@Scope()
export class ScopeModuleAFlow extends BeanScopeBase {}

export interface ScopeModuleAFlow
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
    'a-flow': ScopeModuleAFlow;
  }

  export interface IBeanScopeConfig {
    'a-flow': ReturnType<typeof config>;
  }

  export interface IBeanScopeLocale {
    'a-flow': typeof locales[TypeLocaleBase];
  }
}
