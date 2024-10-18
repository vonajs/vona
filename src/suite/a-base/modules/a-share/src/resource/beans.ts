export * from '../bean/version.manager.js';
export * from '../bean/bean.share.js';

import { BeanShare } from '../bean/bean.share.js';

declare module 'vona' {
  export interface IBeanRecord {
    share: BeanShare;
  }
}
