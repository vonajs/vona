import { BeanScopeBase, Scope, TypeLocaleBase, TypeModuleResource } from 'vona';
import { IModuleService } from './locals.js';
import { IModuleModel } from './models.js';
import { config, Errors, locales, constants } from '../config/index.js';

@Scope()
export class ScopeModuleAProgress extends BeanScopeBase {}

export interface ScopeModuleAProgress
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
    'a-progress': ScopeModuleAProgress;
  }

  export interface IBeanScopeConfig {
    'a-progress': ReturnType<typeof config>;
  }

  export interface IBeanScopeLocale {
    'a-progress': (typeof locales)[TypeLocaleBase];
  }
}
