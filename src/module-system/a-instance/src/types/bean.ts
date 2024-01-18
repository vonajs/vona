import { VersionManager } from '../beans.js';
import { __ThisModuleType__ } from './this.js';

declare module '@cabloy/core' {
  export interface IBeanRecord {
    'a-version.version.manager': VersionManager;
  }
}
