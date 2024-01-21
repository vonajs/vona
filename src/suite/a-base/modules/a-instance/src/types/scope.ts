import { BeanScopeBase, Scope } from '@cabloy/core';
import { Local } from './local.js';
import { TypeErrors } from './error.js';
import { TypeLocales } from './locale.js';

@Scope()
export class ScopeModule extends BeanScopeBase {}

declare module '@cabloy/core' {
  export interface IBeanScopeRecord {
    'a-instance': ScopeModule;
  }
}

export interface ScopeModule {
  local: Local;
  error: TypeErrors;
  locale: TypeLocales;
}
