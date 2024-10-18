import { BeanScopeBase, Scope, TypeLocaleBase, TypeModuleResource } from 'vona';
import { IModuleLocal } from './locals.js';
import { IModuleModel } from './models.js';
import { config, Errors, locales, constants } from '../config/index.js';

@Scope()
export class ScopeModuleALogin extends BeanScopeBase {}

export interface ScopeModuleALogin
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
    'a-login': ScopeModuleALogin;
  }

  export interface IBeanScopeConfig {
    'a-login': ReturnType<typeof config>;
  }

  export interface IBeanScopeLocale {
    'a-login': typeof locales[TypeLocaleBase];
  }
}
