export * from '../bean/version.manager.js';
export * from '../bean/bean.detail.js';

import { BeanDetail } from '../bean/bean.detail.js';

declare module 'vona' {
  export interface IBeanRecord {
    detail: BeanDetail;
  }
}
