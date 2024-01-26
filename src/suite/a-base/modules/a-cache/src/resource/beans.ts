export * from '../bean/version.manager.js';
export * from '../bean/broadcast.memRemove.js';
export * from '../bean/broadcast.memClear.js';
export * from '../bean/bean.cache.js';

import { BeanCache } from '../bean/bean.cache.js';

export interface IBeanRecord {
  cache: BeanCache;
}
