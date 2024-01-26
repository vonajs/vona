export * from '../bean/version.manager.js';
export * from '../bean/stats.taskHandlings.js';
export * from '../bean/stats.taskClaimings.js';
export * from '../bean/io.message.workflow.js';
export * from '../bean/flow.node.startEventAtom.js';
export * from '../bean/flow.node.endEventAtom.js';
export * from '../bean/flow.node.activityUserTask.js';
export * from '../bean/bean.flowTask.js';

import { BeanFlowTask } from '../bean/bean.flowTask.js';

declare module '@cabloy/core' {
  export interface IBeanRecord {
    flowTask: BeanFlowTask;
  }
}
