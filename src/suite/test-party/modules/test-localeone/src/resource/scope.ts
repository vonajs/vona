import { BeanScopeBase, Scope, TypeLocaleBase, TypeModuleResource } from 'vona';
import { IModuleService } from './locals.js';
import { IModuleModel } from './models.js';
import { config, Errors, locales, constants } from '../config/index.js';

@Scope()
export class ScopeModuleTestLocaleone extends BeanScopeBase {}

export interface ScopeModuleTestLocaleone
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
    'test-localeone': ScopeModuleTestLocaleone;
  }

  export interface IBeanScopeConfig {
    'test-localeone': ReturnType<typeof config>;
  }

  export interface IBeanScopeLocale {
    'test-localeone': (typeof locales)[TypeLocaleBase];
  }
}
