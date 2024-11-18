import { LocalFlowTaskRecall } from './local.flow.task_recall.js';

export class LocalFlowTaskForward extends LocalFlowTaskRecall {
  // handle: assignee/remark
  async _forward({ handle }: any) {
    // user
    const user = this.contextTask._user;
    // flowTask
    const flowTask = this.contextTask._flowTask;
    // check right
    await this.localRight.forward({ flowTask, user, getOptions: () => this._getNodeOptionsTask() });
    // handle
    await this._forward_handle({ handle });
    // need not notify
    // this._notifyTaskHandlings(flowTask.userIdAssignee);
  }

  // 1. create a new task
  // 2. update handleStatus/handleRemark
  async _forward_handle({ handle }: any) {
    // user
    const user = this.contextTask._user;
    // flowTask
    const flowTask = this.contextTask._flowTask;
    const flowTaskId = flowTask.id;
    // 1. create a new task
    const taskInstance = await this.ctx.bean.flowTask._createTaskInstance({
      nodeInstance: this.nodeInstance,
      userIdAssignee: handle.assignee,
      user,
    });
    // specificFlag: 4
    taskInstance.contextTask._flowTask.specificFlag = 4;
    taskInstance.contextTask._flowTask.flowTaskIdForwardFrom = flowTaskId;
    await taskInstance.modelFlowTask.update(taskInstance.contextTask._flowTask);
    // history
    taskInstance.contextTask._flowTaskHistory.specificFlag = 4;
    taskInstance.contextTask._flowTaskHistory.flowTaskIdForwardFrom = flowTaskId;
    await taskInstance.modelFlowTaskHistory.update(taskInstance.contextTask._flowTaskHistory);
    // notify
    taskInstance._notifyTaskClaimings(taskInstance.contextTask._flowTask.userIdAssignee);
    // 2. update
    // flowTask
    const flowTaskIdForwardTo = taskInstance.contextTask._flowTask.id;
    const timeHandled = new Date();
    this.contextTask._flowTask.timeHandled = timeHandled;
    this.contextTask._flowTask.handleStatus = 4;
    this.contextTask._flowTask.handleRemark = handle.remark;
    this.contextTask._flowTask.flowTaskIdForwardTo = flowTaskIdForwardTo;
    this.contextTask._flowTask.ignoreMark = 1;
    await this.modelFlowTask.update(this.contextTask._flowTask);
    // flowTaskHistory update
    this.contextTask._flowTaskHistory.timeHandled = timeHandled;
    this.contextTask._flowTaskHistory.handleStatus = 4;
    this.contextTask._flowTaskHistory.handleRemark = handle.remark;
    this.contextTask._flowTaskHistory.flowTaskIdForwardTo = flowTaskIdForwardTo;
    this.contextTask._flowTaskHistory.ignoreMark = 1;
    await this.modelFlowTaskHistory.update(this.contextTask._flowTaskHistory);
  }

  async _forwardRecall() {
    // user
    const user = this.contextTask._user;
    // flowTask
    const flowTask = this.contextTask._flowTask;
    // check right
    await this.localRight.forwardRecall({ flowTask, user, getOptions: () => this._getNodeOptionsTask() });
    // handle
    await this._forwardRecall_handle();
  }

  // 1. delete task
  // 2. update task
  async _forwardRecall_handle() {
    // flowTask
    const flowTask = this.contextTask._flowTask;
    // 1. delete task
    let taskTo = await this.modelFlowTask.get({ id: flowTask.flowTaskIdForwardTo });
    if (!taskTo) this.ctx.throw(403);
    taskTo = taskTo!;
    // delete flowTask and flowTaskHistory
    await this.modelFlowTask.delete({ id: taskTo.id });
    await this.modelFlowTaskHistory.delete({ flowTaskId: taskTo.id });
    // notify
    this.self._notifyTaskClaimings(taskTo.userIdAssignee);
    // 2. update
    // flowTask
    this.contextTask._flowTask.timeHandled = null;
    this.contextTask._flowTask.handleStatus = 0;
    this.contextTask._flowTask.handleRemark = null;
    this.contextTask._flowTask.flowTaskIdForwardTo = 0;
    this.contextTask._flowTask.ignoreMark = 0;
    await this.modelFlowTask.update(this.contextTask._flowTask);
    // flowTaskHistory update
    this.contextTask._flowTaskHistory.timeHandled = null;
    this.contextTask._flowTaskHistory.handleStatus = 0;
    this.contextTask._flowTaskHistory.handleRemark = null;
    this.contextTask._flowTaskHistory.flowTaskIdForwardTo = 0;
    this.contextTask._flowTaskHistory.ignoreMark = 0;
    await this.modelFlowTaskHistory.update(this.contextTask._flowTaskHistory);
  }
}
