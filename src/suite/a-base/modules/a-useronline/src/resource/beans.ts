export * from '../bean/version.manager.js';
export * from '../bean/bean.userOnline.js';

import { BeanUserOnline } from '../bean/bean.userOnline.js';

declare module 'vona' {
  export interface IBeanRecord {
    userOnline: BeanUserOnline;
  }
}
