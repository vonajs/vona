import { BeanScopeBase, Scope, TypeModuleResource } from '@cabloy/core';
import { IModuleLocal } from './locals.js';
import { IModuleModel } from './models.js';
import { config, Errors, locales, constants } from '../config/index.js';

@Scope()
export class ScopeModuleABaselayout extends BeanScopeBase {}

export interface ScopeModuleABaselayout
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
    'a-baselayout': ScopeModuleABaselayout;
  }

  export interface IBeanScopeConfig {
    'a-baselayout': ReturnType<typeof config>;
  }
}
