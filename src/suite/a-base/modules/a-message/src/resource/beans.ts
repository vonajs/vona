export * from '../bean/version.manager.js';
export * from '../bean/stats.message.js';
export * from '../bean/bean.message.js';
export * from '../bean/virtual.ioMessageUniformBase.js';

import { BeanMessage } from '../bean/bean.message.js';
import { BeanIoMessageUniformBase } from '../bean/virtual.ioMessageUniformBase.js';

declare module '@cabloy/core' {
  export interface IBeanRecord {
    message: BeanMessage;
    ioMessageUniformBase: BeanIoMessageUniformBase;
  }
}
