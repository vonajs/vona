module.exports = class FlowTask {
  async raiseEventCreated() {
    await this.nodeInstance.change({
      event: 'created',
      taskInstance: this,
    });
    await this._saveVars();
  }

  async raiseEventClaimed() {
    await this.nodeInstance.change({
      event: 'claimed',
      taskInstance: this,
    });
    await this._saveVars();
  }

  async raiseEventCompleted() {
    await this.nodeInstance.change({
      event: 'completed',
      taskInstance: this,
    });
    await this._saveVars();
  }

  async _saveTaskVars() {
    if (!this.contextTask._taskVars._dirty) return;
    // flowTask
    this.contextTask._flowTask.taskVars = JSON.stringify(this.contextTask._taskVars._vars);
    // modelFlowTask maybe deleted when flowTaskStatus=1
    if (this.contextTask._flowTaskHistory.flowTaskStatus === 0) {
      await this.modelFlowTask.update(this.contextTask._flowTask);
    }
    // flowTask history
    this.contextTask._flowTaskHistory.taskVars = this.contextTask._flowTask.taskVars;
    await this.modelFlowTaskHistory.update(this.contextTask._flowTaskHistory);
    // done
    this.contextTask._taskVars._dirty = false;
  }

  async _saveVars() {
    // save taskVars
    await this._saveTaskVars();
    // save nodeVars
    await this.nodeInstance._saveNodeVars();
    // save flowVars
    await this.flowInstance._saveFlowVars();
  }
};
