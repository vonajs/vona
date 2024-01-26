export * from '../bean/version.manager.js';
export * from '../bean/bean.dict.js';

import { BeanDict } from '../bean/bean.dict.js';

export interface IBeanRecord {
  dict: BeanDict;
}
