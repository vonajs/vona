import { LocalVersion } from '../beans.js';

declare module '@cabloy/core' {
  export interface ILocalRecord {
    version: LocalVersion;
  }
}
