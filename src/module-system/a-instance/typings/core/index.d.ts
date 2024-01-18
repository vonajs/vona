import '../../../../../typings/core/index.d.js';
import { ScopeModule } from '../../src/types/scope.js';

declare module '@cabloy/core' {
  interface BeanBase {
    scope: ScopeModule;
  }
}
