import { LocalFlowTaskInit } from './local.flow.task_init.js';

export class LocalFlowTaskRecall extends LocalFlowTaskInit {
  async _recall() {
    // user
    const user = this.contextTask._user;
    // flowTask
    const flowTask = this.contextTask._flowTask;
    // check right
    await this.localRight.recall({ flowTask, user });
    // handle
    await this._recall_handle();
    // notify
    this.self._notifyTaskHandlings(flowTask.userIdAssignee);
  }

  async _recall_handle() {
    // flowTask
    const flowTask = this.contextTask._flowTask;
    const flowTaskId = flowTask.id;
    // flowTaskHistory update
    this.contextTask._flowTaskHistory.flowTaskStatus = 1;
    this.contextTask._flowTaskHistory.timeHandled = new Date();
    this.contextTask._flowTaskHistory.handleStatus = 1;
    await this.modelFlowTaskHistory.update(this.contextTask._flowTaskHistory);
    // delete flowTask and flowTaskHistory
    await this.modelFlowTask.delete({ id: flowTaskId });
    await this.modelFlowTaskHistory.delete({ flowTaskId });
    // notify
    const _tasks = await this.modelFlowTask.select({
      where: {
        flowNodeId: flowTask.flowNodeId,
        id: { op: '<>', val: flowTaskId },
      },
    });
    for (const _task of _tasks) {
      this.self._notifyTaskClaimings(_task.userIdAssignee);
    }
    // delete other tasks
    await this.modelFlowTask.delete({
      flowNodeId: flowTask.flowNodeId,
      id: { op: '<>', val: flowTaskId },
    });
    await this.modelFlowTaskHistory.delete({
      flowNodeId: flowTask.flowNodeId,
      flowTaskId: { op: '<>', val: flowTaskId },
    });
    // recall
    return await this.ctx.bean.flowTask._gotoFlowNodePrevious({
      nodeInstance: this.nodeInstance,
      rejectedNode: null,
      flowNodeRemark: 'Recalled',
    });
  }
}
