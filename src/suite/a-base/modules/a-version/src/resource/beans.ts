export * from '../bean/version.manager.js';
export * from '../bean/startup.workerAlive.js';
export * from '../bean/startup.databaseInit.js';
export * from '../bean/startup.databaseName.js';
export * from '../bean/startup.instanceInit.js';
export * from '../bean/broadcast.columnsClear.js';
export * from '../bean/bean.worker.js';

import { BeanWorker } from '../bean/bean.worker.js';

declare module '@cabloy/core' {
  export interface IBeanRecord {
    worker: BeanWorker;
  }
}
