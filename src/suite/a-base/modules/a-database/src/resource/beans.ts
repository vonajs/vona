export * from '../bean/bean.database.js';

import { BeanDatabase } from '../bean/bean.database.js';

declare module '@cabloy/core' {
  export interface IBeanRecord {
    database: BeanDatabase;
  }
}
