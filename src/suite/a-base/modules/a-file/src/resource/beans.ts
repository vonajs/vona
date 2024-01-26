export * from '../bean/version.manager.js';
export * from '../bean/bean.file.js';

import { BeanFile } from '../bean/bean.file.js';

declare module '@cabloy/core' {
  export interface IBeanRecord {
    file: BeanFile;
  }
}
