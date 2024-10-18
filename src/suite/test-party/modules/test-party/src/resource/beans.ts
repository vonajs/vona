export * from '../bean/version.manager.js';
export * from '../bean/test.ctx_1.js';
export * from '../bean/test.ctx_0.js';
export * from '../bean/test.ctx.js';
export * from '../bean/test.class.js';
export * from '../bean/test.app.js';
export * from '../bean/summer.cache.test.js';
export * from '../bean/stats.tasksUser.js';
export * from '../bean/stats.tasksInstance.js';
export * from '../bean/startup.startupInstance.js';
export * from '../bean/startup.startupAll.js';
export * from '../bean/sequence.test.js';
export * from '../bean/schedule.test.js';
export * from '../bean/queue.test.js';
export * from '../bean/middleware.testRestructuring.js';
export * from '../bean/middleware.testInterception.js';
export * from '../bean/io.message.test.js';
export * from '../bean/io.message.simpleChat.js';
export * from '../bean/event.userVerify.js';
export * from '../bean/event.loginInfoDashboard.js';
export * from '../bean/event.loginInfo.js';
export * from '../bean/event.helloEcho.js';
export * from '../bean/cli.default.demo.js';
export * from '../bean/broadcast.test.js';

import { BeanTestCtx } from '../bean/test.ctx.js';

declare module 'vona' {
  export interface IBeanRecord {
    testCtx: BeanTestCtx;
  }
}
