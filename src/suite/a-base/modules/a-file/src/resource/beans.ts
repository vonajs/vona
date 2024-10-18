export * from '../bean/version.manager.js';
export * from '../bean/bean.file.js';

import { BeanFile } from '../bean/bean.file.js';

declare module 'vona' {
  export interface IBeanRecord {
    file: BeanFile;
  }
}
