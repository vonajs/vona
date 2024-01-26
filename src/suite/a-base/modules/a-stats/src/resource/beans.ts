export * from '../bean/version.manager.js';
export * from '../bean/stats.deps.js';
export * from '../bean/queue.stats.js';
export * from '../bean/io.message.stats.js';
export * from '../bean/bean.stats.js';

import { BeanStats } from '../bean/bean.stats.js';

export interface IBeanRecord {
  stats: BeanStats;
}
