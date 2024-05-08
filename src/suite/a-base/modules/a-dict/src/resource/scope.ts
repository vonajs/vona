import { BeanScopeBase, Scope, TypeLocaleBase, TypeModuleResource } from '@cabloy/core';
import { IModuleLocal } from './locals.js';
import { IModuleModel } from './models.js';
import { config, Errors, locales, constants } from '../config/index.js';

@Scope()
export class ScopeModuleADict extends BeanScopeBase {}

export interface ScopeModuleADict
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
    'a-dict': ScopeModuleADict;
  }

  export interface IBeanScopeConfig {
    'a-dict': ReturnType<typeof config>;
  }

  export interface IBeanScopeLocale {
    'a-dict': typeof locales[TypeLocaleBase];
  }
}
