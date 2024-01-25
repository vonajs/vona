import LocalFlowTask0 from './local.flow.task_0.js';

export class LocalFlowTaskAppendHandleRemark extends LocalFlowTask0 {
  async _appendHandleRemark({ handle }) {
    // user
    const user = this.contextTask._user;
    // flowTask
    const flowTask = this.contextTask._flowTaskHistory;
    // check right
    await this.localRight.appendHandleRemark({ flowTask, user, flowNodeType: this.contextTask._nodeDef.type });
    // only update flowTaskHistory
    this.contextTask._flowTaskHistory.handleRemark = handle.remark;
    await this.modelFlowTaskHistory.update(this.contextTask._flowTaskHistory);
  }
}
