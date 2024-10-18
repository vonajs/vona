import { BeanScopeBase, Scope, TypeLocaleBase, TypeModuleResource } from 'vona';
import { IModuleLocal } from './locals.js';
import { IModuleModel } from './models.js';
import { config, Errors, locales, constants } from '../config/index.js';

@Scope()
export class ScopeModuleAAppbooster extends BeanScopeBase {}

export interface ScopeModuleAAppbooster
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
    'a-appbooster': ScopeModuleAAppbooster;
  }

  export interface IBeanScopeConfig {
    'a-appbooster': ReturnType<typeof config>;
  }

  export interface IBeanScopeLocale {
    'a-appbooster': typeof locales[TypeLocaleBase];
  }
}
