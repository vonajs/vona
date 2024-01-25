module.exports = class FlowTask {
  _notifyTaskClaimings(userId) {
    this.ctx.bean.flowTask._notifyTaskClaimings(userId);
  }

  _notifyTaskHandlings(userId) {
    this.ctx.bean.flowTask._notifyTaskHandlings(userId);
  }
};
