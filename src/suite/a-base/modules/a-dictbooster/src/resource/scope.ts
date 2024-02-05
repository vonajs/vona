import { BeanScopeBase, Scope, TypeModuleResource } from '@cabloy/core';
import { IModuleLocal } from './locals.js';
import { IModuleModel } from './models.js';
import { config, Errors, locales, constants } from '../config/index.js';

@Scope()
export class ScopeModuleADictbooster extends BeanScopeBase {}

export interface ScopeModuleADictbooster
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
    'a-dictbooster': ScopeModuleADictbooster;
  }

  export interface IBeanScopeConfig {
    'a-dictbooster': ReturnType<typeof config>;
  }
}
