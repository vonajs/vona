import { LocalFlowTaskCancelFlow } from './local.flow.task_cancelFlow.js';

export class LocalFlowTaskClaim extends LocalFlowTaskCancelFlow {
  async _claim() {
    // user
    const user = this.contextTask._user;
    // flowTask
    const flowTask = this.contextTask._flowTask;
    const flowTaskId = flowTask.id;
    // check right
    const right = await this.localRight.claim({ flowTask, user });
    if (right) return right;
    // flowTask
    const timeClaimed = new Date();
    this.contextTask._flowTask.timeClaimed = timeClaimed;
    this.contextTask._flowTask.flowTaskHidden = 0; // show
    await this.modelFlowTask.update(this.contextTask._flowTask);
    // history
    this.contextTask._flowTaskHistory.timeClaimed = timeClaimed;
    this.contextTask._flowTaskHistory.flowTaskHidden = 0; // show
    await this.modelFlowTaskHistory.update(this.contextTask._flowTaskHistory);
    // delete recall task: (specificFlag=2)
    const _taskRecall = await this.modelFlowTask.get({
      flowNodeId: flowTask.flowNodeId,
      specificFlag: 2,
    });
    if (_taskRecall) {
      this.self._notifyTaskHandlings(_taskRecall.userIdAssignee);
      // delete task
      await this.modelFlowTask.delete({ id: _taskRecall.id });
      await this.modelFlowTaskHistory.delete({
        flowTaskId: _taskRecall.id,
      });
    }
    // check if bidding
    const options = this.app.bean.flowTask._getNodeDefOptionsTask({ nodeInstance: this.nodeInstance });
    if (options.bidding) {
      // notify
      const _tasks = await this.modelFlowTask.select({
        where: {
          flowNodeId: flowTask.flowNodeId,
          id: { op: '<>', val: flowTaskId },
          flowTaskStatus: 0,
          handleStatus: 0,
        },
      });
      for (const _task of _tasks) {
        this.self._notifyTaskClaimings(_task.userIdAssignee);
      }
      // delete other tasks
      await this.modelFlowTask.delete({
        flowNodeId: flowTask.flowNodeId,
        id: { op: '<>', val: flowTaskId },
        flowTaskStatus: 0,
        handleStatus: 0,
      });
      await this.modelFlowTaskHistory.delete({
        flowNodeId: flowTask.flowNodeId,
        flowTaskId: { op: '<>', val: flowTaskId },
        flowTaskStatus: 0,
        handleStatus: 0,
      });
    }
    // event: task.claimed
    await this.self.raiseEventClaimed();
    // notify
    this.self._notifyTaskClaimings(flowTask.userIdAssignee);
    this.self._notifyTaskHandlings(flowTask.userIdAssignee);
    // ok
    return { timeClaimed };
  }
}
