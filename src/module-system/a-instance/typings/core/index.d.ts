import '@cabloy/core';
import { ScopeModule } from '../../src/types/scope.js';

declare module '@cabloy/core' {
  interface BeanBase {
    scope: ScopeModule;
  }
}
