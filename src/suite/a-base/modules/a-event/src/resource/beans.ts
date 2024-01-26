export * from '../bean/bean.event.js';

import { BeanEvent } from '../bean/bean.event.js';

declare module '@cabloy/core' {
  export interface IBeanRecord {
    event: BeanEvent;
  }
}
