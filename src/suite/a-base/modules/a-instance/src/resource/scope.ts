import { BeanScopeBase, Scope, TypeModuleResource } from '@cabloy/core';
import { IModuleLocal } from '../resource/locals.js';
import { config } from '../config/config.js';
import { Errors } from '../config/errors.js';
import { locales } from '../config/locales.js';

@Scope()
export class ScopeModule extends BeanScopeBase {}

export interface ScopeModule extends TypeModuleResource<IModuleLocal, typeof config, typeof Errors, typeof locales> {}

declare module '@cabloy/core' {
  export interface IBeanScopeRecord {
    'a-instance': ScopeModule;
  }
}
