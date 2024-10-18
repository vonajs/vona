import { BeanScopeBase, Scope, TypeLocaleBase, TypeModuleResource } from 'vona';
import { IModuleLocal } from './locals.js';
import { IModuleModel } from './models.js';
import { config, Errors, locales, constants } from '../config/index.js';

@Scope()
export class ScopeModuleADashboard extends BeanScopeBase {}

export interface ScopeModuleADashboard
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
    'a-dashboard': ScopeModuleADashboard;
  }

  export interface IBeanScopeConfig {
    'a-dashboard': ReturnType<typeof config>;
  }

  export interface IBeanScopeLocale {
    'a-dashboard': typeof locales[TypeLocaleBase];
  }
}
