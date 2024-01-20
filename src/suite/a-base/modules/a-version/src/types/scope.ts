import { BeanScopeBase, Scope } from '@cabloy/core';
import { Local } from './local.js';
import { Error } from './error.js';

@Scope()
export class ScopeModule extends BeanScopeBase {}

declare module '@cabloy/core' {
  export interface IBeanScopeRecord {
    'a-version': ScopeModule;
  }
}

export interface ScopeModule {
  local: Local;
  error: Error;
}
