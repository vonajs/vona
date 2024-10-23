import { BeanScopeBase, Scope, TypeLocaleBase, TypeModuleResource } from 'vona';
import { IModuleService } from './locals.js';
import { IModuleModel } from './models.js';
import { config, Errors, locales, constants } from '../config/index.js';

@Scope()
export class ScopeModuleACli extends BeanScopeBase {}

export interface ScopeModuleACli
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
    'a-cli': ScopeModuleACli;
  }

  export interface IBeanScopeConfig {
    'a-cli': ReturnType<typeof config>;
  }

  export interface IBeanScopeLocale {
    'a-cli': (typeof locales)[TypeLocaleBase];
  }
}
