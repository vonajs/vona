import { BeanScopeBase, Scope } from '@cabloy/core';
import { LocalVersion } from '../beans.js';

@Scope()
export class ScopeModule extends BeanScopeBase {}

export interface ScopeModule {
  local: {
    version: LocalVersion;
  };
}
