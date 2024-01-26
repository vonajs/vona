export * from '../bean/virtual.atomCmsBase.js';
export * from '../bean/version.manager_0.js';
export * from '../bean/version.manager.js';
export * from '../bean/startup.registerDevelopment.js';
export * from '../bean/startup.registerAllWatchers.js';
export * from '../bean/queue.render.js';
export * from '../bean/io.message.hotloadFile.js';
export * from '../bean/bean.cms.js';

import { BeanCms } from '../bean/bean.cms.js';

declare module '@cabloy/core' {
  export interface IBeanRecord {
    cms: BeanCms;
  }
}
