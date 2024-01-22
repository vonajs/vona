const VarsFn = require('../../common/vars.js');
const UtilsFn = require('../../common/utils.js');

// const moduleInfo = module.info;
module.exports = class FlowTask {
  async init({ userIdAssignee, user }) {
    // create flowTask
    const flowTaskId = await this._createFlowTask({ userIdAssignee, user });
    // context init
    await this._contextInit({ flowTaskId, user });
    // event
    await this.raiseEventCreated();
  }

  async _load({ flowTask, user, history }) {
    // context init
    await this._contextInit({ flowTaskId: flowTask.id, user, history });
  }

  async _createFlowTask({ userIdAssignee, user }) {
    // options
    const options = this.ctx.bean.flowTask._getNodeDefOptionsTask({ nodeInstance: this.nodeInstance });
    // flowTask
    const data = {
      flowId: this.context._flowId,
      flowNodeId: this.contextNode._flowNodeId,
      flowTaskStatus: 0,
      userIdAssignee,
      specificFlag: 0,
      taskVars: '{}',
      allowViewWorkflow: options.allowViewWorkflow,
    };
    const res = await this.modelFlowTask.insert(data);
    const flowTaskId = res.insertId;
    // flowTaskHistory
    data.flowTaskId = flowTaskId;
    await this.modelFlowTaskHistory.insert(data);
    // notify
    this._notifyTaskClaimings(userIdAssignee);
    // publish uniform message
    await this._publishMessageTaskInit({ flowTaskId, userIdAssignee, user });
    // ok
    return flowTaskId;
  }

  async _contextInit({ flowTaskId, user, history }) {
    // flowTaskId
    this.contextTask._flowTaskId = flowTaskId;
    // flowTask
    if (!history) {
      this.contextTask._flowTask = await this.modelFlowTask.get({ id: flowTaskId });
    }
    this.contextTask._flowTaskHistory = await this.modelFlowTaskHistory.get({ flowTaskId });
    // taskVars
    this.contextTask._taskVars = new (VarsFn())();
    this.contextTask._taskVars._vars = this.contextTask._flowTaskHistory.taskVars
      ? JSON.parse(this.contextTask._flowTaskHistory.taskVars)
      : {};
    // utils
    this.contextTask._utils = new (UtilsFn({ ctx: this.ctx, flowInstance: this.flowInstance }))({
      context: this.context,
      contextNode: this.contextNode,
      contextTask: this.contextTask,
    });
    // user
    this.contextTask._user = user;
  }

  async _hidden({ hidden }) {
    // flowTask
    const flowTaskHidden = hidden ? 1 : 0;
    this.contextTask._flowTask.flowTaskHidden = flowTaskHidden;
    await this.modelFlowTask.update(this.contextTask._flowTask);
    // history
    this.contextTask._flowTaskHistory.flowTaskHidden = flowTaskHidden;
    await this.modelFlowTaskHistory.update(this.contextTask._flowTaskHistory);
  }

  _getNodeOptionsTask() {
    return this.ctx.bean.flowTask._getNodeDefOptionsTask({ nodeInstance: this.nodeInstance });
  }
};
