import { BeanScopeBase, Scope, TypeModuleResource } from '@cabloy/core';
import { IModuleLocal } from './locals.js';
import { IModuleModel } from './models.js';
import { config, Errors, locales, constants } from '../config/index.js';

@Scope()
export class ScopeModuleAAntvg6 extends BeanScopeBase {}

export interface ScopeModuleAAntvg6
  extends TypeModuleResource<
    IModuleLocal,
    IModuleModel,
    typeof config,
    typeof Errors,
    typeof locales,
    typeof constants
  > {}

declare module '@cabloy/core' {
  export interface IBeanScopeRecord {
    'a-antvg6': ScopeModuleAAntvg6;
  }

  export interface IBeanScopeConfig {
    'a-antvg6': ReturnType<typeof config>;
  }
}
