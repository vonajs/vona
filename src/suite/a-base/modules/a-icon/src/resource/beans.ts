export * from '../bean/version.manager.js';
export * from '../bean/bean.icon.js';

import { BeanIcon } from '../bean/bean.icon.js';

declare module 'vona' {
  export interface IBeanRecord {
    icon: BeanIcon;
  }
}
