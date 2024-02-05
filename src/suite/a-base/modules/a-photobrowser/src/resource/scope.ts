import { BeanScopeBase, Scope, TypeModuleResource } from '@cabloy/core';
import { IModuleLocal } from './locals.js';
import { IModuleModel } from './models.js';
import { config, Errors, locales, constants } from '../config/index.js';

@Scope()
export class ScopeModuleAPhotobrowser extends BeanScopeBase {}

export interface ScopeModuleAPhotobrowser
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
    'a-photobrowser': ScopeModuleAPhotobrowser;
  }

  export interface IBeanScopeConfig {
    'a-photobrowser': ReturnType<typeof config>;
  }
}
