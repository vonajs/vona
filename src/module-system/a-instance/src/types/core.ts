import '@cabloy/core';
import { ScopeModule } from './scope.js';

declare module '@cabloy/core' {
  interface BeanBase {
    scope: ScopeModule;
  }
}
