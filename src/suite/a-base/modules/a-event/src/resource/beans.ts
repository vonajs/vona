export * from '../bean/bean.event.js';

import { BeanEvent } from '../bean/bean.event.js';

declare module 'vona' {
  export interface IBeanRecord {
    event: BeanEvent;
  }
}
