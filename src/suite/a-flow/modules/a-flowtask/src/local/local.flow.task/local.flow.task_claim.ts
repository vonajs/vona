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
    const _taskRecall = await this.ctx.model.queryOne(
      `
          select id,userIdAssignee from aFlowTask
            where iid=? and deleted=0 and flowNodeId=? and specificFlag=2
          `,
      [this.ctx.instance.id, flowTask.flowNodeId],
    );
    if (_taskRecall) {
      this.self._notifyTaskHandlings(_taskRecall.userIdAssignee);
      // delete task
      await this.ctx.model.query(
        `
          delete from aFlowTask
            where iid=? and id=?
          `,
        [this.ctx.instance.id, _taskRecall.id],
      );
      await this.ctx.model.query(
        `
          update aFlowTaskHistory set deleted=1
            where iid=? and deleted=0 and flowTaskId=?
          `,
        [this.ctx.instance.id, _taskRecall.id],
      );
    }
    // check if bidding
    const options = this.ctx.bean.flowTask._getNodeDefOptionsTask({ nodeInstance: this.nodeInstance });
    if (options.bidding) {
      // notify
      const _tasks = await this.ctx.model.query(
        `
          select id,userIdAssignee from aFlowTask
            where iid=? and deleted=0 and flowNodeId=? and id<>? and (flowTaskStatus=0 and handleStatus=0)
          `,
        [this.ctx.instance.id, flowTask.flowNodeId, flowTaskId],
      );
      for (const _task of _tasks) {
        this.self._notifyTaskClaimings(_task.userIdAssignee);
      }
      // delete other tasks
      await this.ctx.model.query(
        `
          delete from aFlowTask
            where iid=? and flowNodeId=? and id<>? and (flowTaskStatus=0 and handleStatus=0)
          `,
        [this.ctx.instance.id, flowTask.flowNodeId, flowTaskId],
      );
      await this.ctx.model.query(
        `
          update aFlowTaskHistory set deleted=1
            where iid=? and deleted=0 and flowNodeId=? and flowTaskId<>? and (flowTaskStatus=0 and handleStatus=0)
          `,
        [this.ctx.instance.id, flowTask.flowNodeId, flowTaskId],
      );
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
