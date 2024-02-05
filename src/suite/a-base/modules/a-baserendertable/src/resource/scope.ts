import { BeanScopeBase, Scope, TypeModuleResource } from '@cabloy/core';
import { IModuleLocal } from './locals.js';
import { IModuleModel } from './models.js';
import { config, Errors, locales, constants } from '../config/index.js';

@Scope()
export class ScopeModuleABaserendertable extends BeanScopeBase {}

export interface ScopeModuleABaserendertable
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
    'a-baserendertable': ScopeModuleABaserendertable;
  }

  export interface IBeanScopeConfig {
    'a-baserendertable': ReturnType<typeof config>;
  }
}
