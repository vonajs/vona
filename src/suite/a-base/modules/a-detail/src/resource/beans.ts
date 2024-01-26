export * from '../bean/version.manager.js';
export * from '../bean/bean.detail.js';

import { BeanDetail } from '../bean/bean.detail.js';

export interface IBeanRecord {
  detail: BeanDetail;
}
