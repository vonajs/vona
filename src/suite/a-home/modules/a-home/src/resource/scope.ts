import { BeanScopeBase, Scope, TypeLocaleBase, TypeModuleResource } from 'vona';
import { IModuleService } from './locals.js';
import { IModuleModel } from './models.js';
import { config, Errors, locales, constants } from '../config/index.js';

@Scope()
export class ScopeModuleAHome extends BeanScopeBase {}

export interface ScopeModuleAHome
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
    'a-home': ScopeModuleAHome;
  }

  export interface IBeanScopeConfig {
    'a-home': ReturnType<typeof config>;
  }

  export interface IBeanScopeLocale {
    'a-home': (typeof locales)[TypeLocaleBase];
  }
}
