import { BeanScopeBase, Scope } from '@cabloy/core';
import { LocalVersion } from '../beans.js';
import { Errors } from '../index.js';

@Scope()
export class ScopeModule extends BeanScopeBase {}

declare module '@cabloy/core' {
  export interface IBeanScopeRecord {
    'a-version': ScopeModule;
  }
}

export interface ScopeModule {
  local: {
    version: LocalVersion;
  };
  error: typeof Errors;
}
