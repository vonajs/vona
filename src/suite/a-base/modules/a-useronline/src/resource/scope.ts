import { BeanScopeBase, Scope, TypeLocaleBase, TypeModuleResource } from 'vona';
import { IModuleService } from './locals.js';
import { IModuleModel } from './models.js';
import { config, Errors, locales, constants } from '../config/index.js';

@Scope()
export class ScopeModuleAUseronline extends BeanScopeBase {}

export interface ScopeModuleAUseronline
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
    'a-useronline': ScopeModuleAUseronline;
  }

  export interface IBeanScopeConfig {
    'a-useronline': ReturnType<typeof config>;
  }

  export interface IBeanScopeLocale {
    'a-useronline': (typeof locales)[TypeLocaleBase];
  }
}
