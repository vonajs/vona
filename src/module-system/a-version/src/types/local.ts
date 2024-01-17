import { LocalVersion } from '../beans.js';
import { __TypeThisModule__ } from './this.js';

declare module '@cabloy/core' {
  export interface ILocalRecord {
    version: LocalVersion;
  }
}
