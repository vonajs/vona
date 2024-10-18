import { BeanScopeBase, Scope, TypeLocaleBase, TypeModuleResource } from 'vona';
import { IModuleLocal } from './locals.js';
import { IModuleModel } from './models.js';
import { config, Errors, locales, constants } from '../config/index.js';

@Scope()
export class ScopeModuleASettings extends BeanScopeBase {}

export interface ScopeModuleASettings
  extends TypeModuleResource<
    IModuleLocal,
    IModuleModel,
    typeof config,
    typeof Errors,
    typeof locales[TypeLocaleBase],
    typeof constants
  > {}

declare module 'vona' {
  export interface IBeanScopeRecord {
    'a-settings': ScopeModuleASettings;
  }

  export interface IBeanScopeConfig {
    'a-settings': ReturnType<typeof config>;
  }

  export interface IBeanScopeLocale {
    'a-settings': typeof locales[TypeLocaleBase];
  }
}
