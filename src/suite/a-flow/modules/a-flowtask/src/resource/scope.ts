import { BeanScopeBase, Scope, TypeLocaleBase, TypeModuleResource } from 'vona';
import { IModuleLocal } from './locals.js';
import { IModuleModel } from './models.js';
import { config, Errors, locales, constants } from '../config/index.js';

@Scope()
export class ScopeModuleAFlowtask extends BeanScopeBase {}

export interface ScopeModuleAFlowtask
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
    'a-flowtask': ScopeModuleAFlowtask;
  }

  export interface IBeanScopeConfig {
    'a-flowtask': ReturnType<typeof config>;
  }

  export interface IBeanScopeLocale {
    'a-flowtask': typeof locales[TypeLocaleBase];
  }
}
