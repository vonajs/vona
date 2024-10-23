import { BeanScopeBase, Scope, TypeLocaleBase, TypeModuleResource } from 'vona';
import { IModuleService } from './locals.js';
import { IModuleModel } from './models.js';
import { config, Errors, locales, constants } from '../config/index.js';

@Scope()
export class ScopeModuleAThemehyacinth extends BeanScopeBase {}

export interface ScopeModuleAThemehyacinth
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
    'a-themehyacinth': ScopeModuleAThemehyacinth;
  }

  export interface IBeanScopeConfig {
    'a-themehyacinth': ReturnType<typeof config>;
  }

  export interface IBeanScopeLocale {
    'a-themehyacinth': (typeof locales)[TypeLocaleBase];
  }
}
