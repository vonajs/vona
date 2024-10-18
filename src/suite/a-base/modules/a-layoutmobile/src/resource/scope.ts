import { BeanScopeBase, Scope, TypeLocaleBase, TypeModuleResource } from 'vona';
import { IModuleLocal } from './locals.js';
import { IModuleModel } from './models.js';
import { config, Errors, locales, constants } from '../config/index.js';

@Scope()
export class ScopeModuleALayoutmobile extends BeanScopeBase {}

export interface ScopeModuleALayoutmobile
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
    'a-layoutmobile': ScopeModuleALayoutmobile;
  }

  export interface IBeanScopeConfig {
    'a-layoutmobile': ReturnType<typeof config>;
  }

  export interface IBeanScopeLocale {
    'a-layoutmobile': typeof locales[TypeLocaleBase];
  }
}
