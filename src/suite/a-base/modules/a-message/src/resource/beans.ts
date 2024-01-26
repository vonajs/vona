export * from '../bean/version.manager.js';
export * from '../bean/stats.message.js';
export * from '../bean/bean.message.js';

import { BeanMessage } from '../bean/bean.message.js';

declare module '@cabloy/core' {
  export interface IBeanRecord {
    message: BeanMessage;
  }
}
