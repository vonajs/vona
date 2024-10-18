import { BeanScopeBase, Scope, TypeLocaleBase, TypeModuleResource } from 'vona';
import { IModuleLocal } from './locals.js';
import { IModuleModel } from './models.js';
import { config, Errors, locales, constants } from '../config/index.js';

@Scope()
export class ScopeModuleCmsPlugincopyright extends BeanScopeBase {}

export interface ScopeModuleCmsPlugincopyright
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
    'cms-plugincopyright': ScopeModuleCmsPlugincopyright;
  }

  export interface IBeanScopeConfig {
    'cms-plugincopyright': ReturnType<typeof config>;
  }

  export interface IBeanScopeLocale {
    'cms-plugincopyright': typeof locales[TypeLocaleBase];
  }
}
