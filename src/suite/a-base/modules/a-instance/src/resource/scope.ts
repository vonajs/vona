import { BeanScopeBase, Scope, TypeModuleResource } from '@cabloy/core';
import { IModuleLocal } from './locals.js';
import { IModuleModel } from './models.js';
import { config, Errors, locales } from '../config/index.js';

@Scope()
export class ScopeModule extends BeanScopeBase {}

export interface ScopeModule
  extends TypeModuleResource<IModuleLocal, IModuleModel, typeof config, typeof Errors, typeof locales> {}

declare module '@cabloy/core' {
  export interface IBeanScopeRecord {
    'a-instance': ScopeModule;
  }
}
