import { BeanScopeBase, Scope, TypeLocaleBase, TypeModuleResource } from 'vona';
import { IModuleLocal } from './locals.js';
import { IModuleModel } from './models.js';
import { config, Errors, locales, constants } from '../config/index.js';

@Scope()
export class ScopeModuleCmsThemedocs extends BeanScopeBase {}

export interface ScopeModuleCmsThemedocs
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
    'cms-themedocs': ScopeModuleCmsThemedocs;
  }

  export interface IBeanScopeConfig {
    'cms-themedocs': ReturnType<typeof config>;
  }

  export interface IBeanScopeLocale {
    'cms-themedocs': typeof locales[TypeLocaleBase];
  }
}
