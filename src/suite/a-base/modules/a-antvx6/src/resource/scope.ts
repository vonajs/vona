import { BeanScopeBase, Scope, TypeModuleResource } from '@cabloy/core';
import { IModuleLocal } from './locals.js';
import { IModuleModel } from './models.js';
import { config, Errors, locales, constants } from '../config/index.js';

@Scope()
export class ScopeModuleAAntvx6 extends BeanScopeBase {}

export interface ScopeModuleAAntvx6
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
    'a-antvx6': ScopeModuleAAntvx6;
  }

  export interface IBeanScopeConfig {
    'a-antvx6': ReturnType<typeof config>;
  }
}
