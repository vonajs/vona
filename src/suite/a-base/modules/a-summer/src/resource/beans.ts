export * from '../bean/version.manager.js';
export * from '../bean/broadcast.memMultiDel.js';
export * from '../bean/broadcast.memDel.js';
export * from '../bean/broadcast.memClear.js';
export * from '../bean/bean.summer.js';

import { BeanSummer } from '../bean/bean.summer.js';

declare module 'vona' {
  export interface IBeanRecord {
    summer: BeanSummer;
  }
}
