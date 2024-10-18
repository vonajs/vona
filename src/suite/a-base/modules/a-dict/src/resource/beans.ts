export * from '../bean/version.manager.js';
export * from '../bean/bean.dict.js';

import { BeanDict } from '../bean/bean.dict.js';

declare module 'vona' {
  export interface IBeanRecord {
    dict: BeanDict;
  }
}
