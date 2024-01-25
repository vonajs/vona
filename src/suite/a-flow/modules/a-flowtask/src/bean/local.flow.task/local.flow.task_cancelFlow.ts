module.exports = class FlowTask {
  async _cancelFlow({ handle }) {
    // user
    const user = this.contextTask._user;
    // flowTask
    const flowTask = this.contextTask._flowTask;
    // check right
    await this.localRight.cancelFlow({ flowTask, user, getOptions: () => this._getNodeOptionsTask() });
    // handle
    await this._cancelFlow_handle({ handle });
  }

  async _cancelFlow_handle({ handle }) {
    // atomState
    await this.ctx.bean.flowTask._setAtomState({ context: this.context, options: { atomState: -3 } });
    // flowTask
    const flowTask = this.contextTask._flowTask;
    const flowTaskId = flowTask.id;
    // notify
    this._notifyTaskHandlings(flowTask.userIdAssignee);
    // delete flowTask
    await this.modelFlowTask.delete({ id: flowTaskId });
    // flowTaskHistory update
    this.contextTask._flowTaskHistory.flowTaskStatus = 1;
    this.contextTask._flowTaskHistory.timeHandled = new Date();
    this.contextTask._flowTaskHistory.handleStatus = 3;
    this.contextTask._flowTaskHistory.handleRemark = handle.remark;
    await this.modelFlowTaskHistory.update(this.contextTask._flowTaskHistory);
    // node clear
    //    not use handle.remark
    const remark = 'Cancelled'; // handle.remark;
    await this.nodeInstance.clear({ flowNodeHandleStatus: 3, flowNodeRemark: remark });
    // end flow
    await this.flowInstance._endFlow({
      flowHandleStatus: 3,
      flowRemark: remark,
      atom: { close: true },
    });
  }
};
