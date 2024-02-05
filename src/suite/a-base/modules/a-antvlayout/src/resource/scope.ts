import { BeanScopeBase, Scope, TypeModuleResource } from '@cabloy/core';
import { IModuleLocal } from './locals.js';
import { IModuleModel } from './models.js';
import { config, Errors, locales, constants } from '../config/index.js';

@Scope()
export class ScopeModuleAAntvlayout extends BeanScopeBase {}

export interface ScopeModuleAAntvlayout
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
    'a-antvlayout': ScopeModuleAAntvlayout;
  }

  export interface IBeanScopeConfig {
    'a-antvlayout': ReturnType<typeof config>;
  }
}
