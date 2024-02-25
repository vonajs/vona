export * from '../bean/version.manager.js';
export * from '../bean/bean.debug.js';

import { BeanDebug } from '../bean/bean.debug.js';

declare module '@cabloy/core' {
  export interface IBeanRecord {
    debug: BeanDebug;
  }
}
