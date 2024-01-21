import { BeanScopeBase, Scope, TypeModuleResource } from '@cabloy/core';
import { Local } from './local.js';
import { TypeErrors } from './error.js';
import { TypeLocales } from './locale.js';
import { TypeConfig } from './config.js';

@Scope()
export class ScopeModule extends BeanScopeBase {}

declare module '@cabloy/core' {
  export interface IBeanScopeRecord {
    'a-version': ScopeModule;
  }
}

export interface ScopeModule extends TypeModuleResource<Local> {
  error: TypeErrors;
  locale: TypeLocales;
  config: TypeConfig;
}
