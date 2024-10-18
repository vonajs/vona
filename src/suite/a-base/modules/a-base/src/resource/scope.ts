import { BeanScopeBase, Scope, TypeLocaleBase, TypeModuleResource } from 'vona';
import { IModuleLocal } from './locals.js';
import { IModuleModel } from './models.js';
import { config, Errors, locales, constants } from '../config/index.js';

@Scope()
export class ScopeModuleABase extends BeanScopeBase {}

export interface ScopeModuleABase
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
    'a-base': ScopeModuleABase;
  }

  export interface IBeanScopeConfig {
    'a-base': ReturnType<typeof config>;
  }

  export interface IBeanScopeLocale {
    'a-base': typeof locales[TypeLocaleBase];
  }
}
