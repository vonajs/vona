import { LocalFlowTaskActions } from './local.flow.task_actions.js';

export class LocalFlowTaskNotify extends LocalFlowTaskActions {
  _notifyTaskClaimings(userId) {
    this.ctx.bean.flowTask._notifyTaskClaimings(userId);
  }

  _notifyTaskHandlings(userId) {
    this.ctx.bean.flowTask._notifyTaskHandlings(userId);
  }
}
