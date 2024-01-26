export * from '../bean/version.manager.js';
export * from '../bean/bean.progress.js';

import { BeanProgress } from '../bean/bean.progress.js';

export interface IBeanRecord {
  progress: BeanProgress;
}
