import { BeanScopeBase, Scope, TypeModuleResource } from '@cabloy/core';
import { IModuleLocal } from './locals.js';
import { IModuleModel } from './models.js';
import { config, Errors, locales, constants } from '../config/index.js';

@Scope()
export class ScopeModuleTestLocaletwo extends BeanScopeBase {}

export interface ScopeModuleTestLocaletwo
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
    'test-localetwo': ScopeModuleTestLocaletwo;
  }

  export interface IBeanScopeConfig {
    'test-localetwo': ReturnType<typeof config>;
  }
}
