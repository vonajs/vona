import { BeanWorker } from '../beans.js';

declare module '@cabloy/core' {
  export interface IBeanRecord {
    worker: BeanWorker;
  }
}
