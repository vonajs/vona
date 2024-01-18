import { VersionManager } from '../beans.js';
import { ScopeModule } from './scope.js';

declare module '@cabloy/core' {
  export interface IBeanRecord {
    'a-version.version.manager': VersionManager;
  }

  export interface BeanBase {
    scope: ScopeModule;
  }
}
