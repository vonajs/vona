export * from '../bean/bean.database.js';
export * from '../bean/database.dialect.mysql.js';
export * from '../bean/database.dialect.mysql2.js';
export * from '../bean/virtual.databaseDialect.js';

import { BeanDatabase } from '../bean/bean.database.js';

declare module '@cabloy/core' {
  export interface IBeanRecord {
    database: BeanDatabase;
  }
}
