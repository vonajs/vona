export * from '../bean/version.manager.js';
export * from '../bean/bean.progress.js';

import { BeanProgress } from '../bean/bean.progress.js';

declare module '@cabloy/core' {
  export interface IBeanRecord {
    progress: BeanProgress;
  }
}
