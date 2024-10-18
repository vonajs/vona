import { BeanScopeBase, Scope, TypeLocaleBase, TypeModuleResource } from 'vona';
import { IModuleLocal } from './locals.js';
import { IModuleModel } from './models.js';
import { config, Errors, locales, constants } from '../config/index.js';

@Scope()
export class ScopeModuleADictbooster extends BeanScopeBase {}

export interface ScopeModuleADictbooster
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
    'a-dictbooster': ScopeModuleADictbooster;
  }

  export interface IBeanScopeConfig {
    'a-dictbooster': ReturnType<typeof config>;
  }

  export interface IBeanScopeLocale {
    'a-dictbooster': typeof locales[TypeLocaleBase];
  }
}
