export * from '../bean/version.manager.js';
export * from '../bean/bean.instance.js';
export * from '../bean/broadcast.resetCache.js';
export * from '../bean/broadcast.reload.js';
export * from '../bean/middleware.appReady.js';
export * from '../bean/middleware.instance.js';

import { BeanInstance } from '../bean/bean.instance.js';

declare module '@cabloy/core' {
  export interface IBeanRecord {
    instance: BeanInstance;
  }
}
