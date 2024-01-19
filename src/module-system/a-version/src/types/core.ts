import '@cabloy/core';
import 'cabloy-module-api-a-instance';
import { ScopeModule } from './scope.js';

declare module '@cabloy/core' {
  interface BeanBase {
    scope: ScopeModule;
  }
}
