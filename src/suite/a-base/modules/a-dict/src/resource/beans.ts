export * from '../bean/version.manager.js';
export * from '../bean/bean.dict.js';

import { BeanDict } from '../bean/bean.dict.js';

declare module '@cabloy/core' {
  export interface IBeanRecord {
    dict: BeanDict;
  }
}
