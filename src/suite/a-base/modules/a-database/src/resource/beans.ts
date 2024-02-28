export * from '../bean/bean.database.js';
export * from '../bean/bean.databaseClient.js';
export * from '../bean/database.dialect.mysql.js';
export * from '../bean/database.dialect.mysql2.js';
export * from '../bean/database.dialect.pg.js';
export * from '../bean/virtual.databaseDialect.js';

import { BeanDatabase } from '../bean/bean.database.js';
import { BeanDatabaseClient } from '../bean/bean.databaseClient.js';

declare module '@cabloy/core' {
  export interface IBeanRecord {
    database: BeanDatabase;
    databaseClient: BeanDatabaseClient;
  }
}
