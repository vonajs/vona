import { BeanScopeBase, Scope, TypeLocaleBase, TypeModuleResource } from '@cabloy/core';
import { IModuleLocal } from './locals.js';
import { IModuleModel } from './models.js';
import { config, Errors, locales, constants } from '../config/index.js';

@Scope()
export class ScopeModuleADebug extends BeanScopeBase {}

export interface ScopeModuleADebug
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
    'a-debug': ScopeModuleADebug;
  }

  export interface IBeanScopeConfig {
    'a-debug': ReturnType<typeof config>;
  }

  export interface IBeanScopeLocale {
    'a-debug': typeof locales[TypeLocaleBase];
  }
}
