import { BeanScopeBase, Scope, TypeModuleResource } from '@cabloy/core';
import { IModuleLocal } from './locals.js';
import { IModuleModel } from './models.js';
import { config, Errors, locales, constants } from '../config/index.js';

@Scope()
export class ScopeModuleAJsoneditor extends BeanScopeBase {}

export interface ScopeModuleAJsoneditor
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
    'a-jsoneditor': ScopeModuleAJsoneditor;
  }

  export interface IBeanScopeConfig {
    'a-jsoneditor': ReturnType<typeof config>;
  }
}
