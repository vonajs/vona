import { BeanScopeBase, Scope } from '@cabloy/core';
import { LocalInstance } from '../beans.js';

@Scope()
export class ScopeModule extends BeanScopeBase {}

declare module '@cabloy/core' {
  export interface IBeanScopeRecord {
    'a-instance': ScopeModule;
  }
}

export interface ScopeModule {
  local: {
    instance: LocalInstance;
  };
}
