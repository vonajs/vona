import { BeanScopeBase, Scope, TypeLocaleBase, TypeModuleResource } from 'vona';
import { IModuleService } from './locals.js';
import { IModuleModel } from './models.js';
import { config, Errors, locales, constants } from '../config/index.js';

@Scope()
export class ScopeModuleAIconbooster extends BeanScopeBase {}

export interface ScopeModuleAIconbooster
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
    'a-iconbooster': ScopeModuleAIconbooster;
  }

  export interface IBeanScopeConfig {
    'a-iconbooster': ReturnType<typeof config>;
  }

  export interface IBeanScopeLocale {
    'a-iconbooster': (typeof locales)[TypeLocaleBase];
  }
}
