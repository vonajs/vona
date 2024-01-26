export * from '../bean/version.manager.js';
export * from '../bean/bean.userOnline.js';

import { BeanUserOnline } from '../bean/bean.userOnline.js';

export interface IBeanRecord {
  userOnline: BeanUserOnline;
}
