export * from '../bean/version.manager.js';
export * from '../bean/bean.status.js';

import { BeanStatus } from '../bean/bean.status.js';

declare module '@cabloy/core' {
  export interface IBeanRecord {
    status: BeanStatus;
  }
}
