import { BeanScopeBase, Scope, TypeLocaleBase, TypeModuleResource } from 'vona';
import { IModuleLocal } from './locals.js';
import { IModuleModel } from './models.js';
import { config, Errors, locales, constants } from '../config/index.js';

@Scope()
export class ScopeModuleAClibooster extends BeanScopeBase {}

export interface ScopeModuleAClibooster
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
    'a-clibooster': ScopeModuleAClibooster;
  }

  export interface IBeanScopeConfig {
    'a-clibooster': ReturnType<typeof config>;
  }

  export interface IBeanScopeLocale {
    'a-clibooster': typeof locales[TypeLocaleBase];
  }
}
