import { BeanScopeBase, Scope, TypeModuleResource } from '@cabloy/core';
import { IModuleLocal } from './locals.js';
import { config, Errors, locales, constants } from '../config/index.js';

@Scope()
export class ScopeModule extends BeanScopeBase {}

export interface ScopeModule
  extends TypeModuleResource<IModuleLocal, null, typeof config, typeof Errors, typeof locales, typeof constants> {}

declare module '@cabloy/core' {
  export interface IBeanScopeRecord {
    'a-version': ScopeModule;
  }
}
