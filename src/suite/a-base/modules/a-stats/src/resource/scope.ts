import { BeanScopeBase, Scope, TypeLocaleBase, TypeModuleResource } from 'vona';
import { IModuleLocal } from './locals.js';
import { IModuleModel } from './models.js';
import { config, Errors, locales, constants } from '../config/index.js';

@Scope()
export class ScopeModuleAStats extends BeanScopeBase {}

export interface ScopeModuleAStats
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
    'a-stats': ScopeModuleAStats;
  }

  export interface IBeanScopeConfig {
    'a-stats': ReturnType<typeof config>;
  }

  export interface IBeanScopeLocale {
    'a-stats': typeof locales[TypeLocaleBase];
  }
}
