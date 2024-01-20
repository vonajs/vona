import { BeanInstance } from '../beans.js';

declare module '@cabloy/core' {
  export interface IBeanRecord {
    instance: BeanInstance;
  }
}
