export * from '../bean/version.manager.js';
export * from '../bean/bean.status.js';

import { BeanStatus } from '../bean/bean.status.js';

declare module 'vona' {
  export interface IBeanRecord {
    status: BeanStatus;
  }
}
