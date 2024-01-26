export * from '../bean/version.manager.js';
export * from '../bean/bean.share.js';

import { BeanShare } from '../bean/bean.share.js';

declare module '@cabloy/core' {
  export interface IBeanRecord {
    share: BeanShare;
  }
}
