import { BeanScopeBase, Scope, TypeModuleResource } from '@cabloy/core';
import { IModuleLocal } from './locals.js';
import { IModuleModel } from './models.js';
import { config, Errors, locales, constants } from '../config/index.js';

@Scope()
export class ScopeModuleABasefront2 extends BeanScopeBase {}

export interface ScopeModuleABasefront2
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
    'a-basefront2': ScopeModuleABasefront2;
  }

  export interface IBeanScopeConfig {
    'a-basefront2': ReturnType<typeof config>;
  }
}
