import { BeanScopeBase, Scope, TypeLocaleBase, TypeModuleResource } from 'vona';
import { IModuleLocal } from './locals.js';
import { IModuleModel } from './models.js';
import { config, Errors, locales, constants } from '../config/index.js';

@Scope()
export class ScopeModuleABaseadmin extends BeanScopeBase {}

export interface ScopeModuleABaseadmin
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
    'a-baseadmin': ScopeModuleABaseadmin;
  }

  export interface IBeanScopeConfig {
    'a-baseadmin': ReturnType<typeof config>;
  }

  export interface IBeanScopeLocale {
    'a-baseadmin': typeof locales[TypeLocaleBase];
  }
}
