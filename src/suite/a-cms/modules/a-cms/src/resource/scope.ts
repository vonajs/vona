import { BeanScopeBase, Scope, TypeLocaleBase, TypeModuleResource } from 'vona';
import { IModuleService } from './locals.js';
import { IModuleModel } from './models.js';
import { config, Errors, locales, constants } from '../config/index.js';

@Scope()
export class ScopeModuleACms extends BeanScopeBase {}

export interface ScopeModuleACms
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
    'a-cms': ScopeModuleACms;
  }

  export interface IBeanScopeConfig {
    'a-cms': ReturnType<typeof config>;
  }

  export interface IBeanScopeLocale {
    'a-cms': (typeof locales)[TypeLocaleBase];
  }
}
