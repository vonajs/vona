import { BeanScopeBase, Scope, TypeLocaleBase, TypeModuleResource } from 'vona';
import { IModuleService } from './locals.js';
import { IModuleModel } from './models.js';
import { config, Errors, locales, constants } from '../config/index.js';

@Scope()
export class ScopeModuleAAuthsms extends BeanScopeBase {}

export interface ScopeModuleAAuthsms
  extends TypeModuleResource<
    IModuleService,
    IModuleModel,
    typeof config,
    typeof Errors,
    (typeof locales)[TypeLocaleBase],
    typeof constants
  > {}

declare module 'vona' {
  export interface IBeanScopeRecord {
    'a-authsms': ScopeModuleAAuthsms;
  }

  export interface IBeanScopeConfig {
    'a-authsms': ReturnType<typeof config>;
  }

  export interface IBeanScopeLocale {
    'a-authsms': (typeof locales)[TypeLocaleBase];
  }
}
