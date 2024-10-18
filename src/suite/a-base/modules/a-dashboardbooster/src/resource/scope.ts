import { BeanScopeBase, Scope, TypeLocaleBase, TypeModuleResource } from 'vona';
import { IModuleLocal } from './locals.js';
import { IModuleModel } from './models.js';
import { config, Errors, locales, constants } from '../config/index.js';

@Scope()
export class ScopeModuleADashboardbooster extends BeanScopeBase {}

export interface ScopeModuleADashboardbooster
  extends TypeModuleResource<
    IModuleLocal,
    IModuleModel,
    typeof config,
    typeof Errors,
    typeof locales[TypeLocaleBase],
    typeof constants
  > {}

declare module '@cabloy/core' {
  export interface IBeanScopeRecord {
    'a-dashboardbooster': ScopeModuleADashboardbooster;
  }

  export interface IBeanScopeConfig {
    'a-dashboardbooster': ReturnType<typeof config>;
  }

  export interface IBeanScopeLocale {
    'a-dashboardbooster': typeof locales[TypeLocaleBase];
  }
}
