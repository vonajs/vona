export * from '../bean/version.manager.js';
export * from '../bean/bean.userOnline.js';

import { BeanUserOnline } from '../bean/bean.userOnline.js';

declare module '@cabloy/core' {
  export interface IBeanRecord {
    userOnline: BeanUserOnline;
  }
}
