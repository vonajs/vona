module.exports = class FlowTask {
  get modelFlowTask() {
    return this.ctx.model.module(moduleInfo.relativeName).flowTask;
  }
  get modelFlowTaskHistory() {
    return this.ctx.model.module(moduleInfo.relativeName).flowTaskHistory;
  }
  get localRight() {
    return this.ctx.bean._getBean('a-flowtask.local.right');
  }
  get sqlProcedure() {
    return this.ctx.bean._getBean('a-flowtask.local.procedure');
  }

  async count({ options, user }) {
    return await this.select({ options, user, count: 1 });
  }

  async select({ options, user, pageForce = true, count = 0 }) {
    const tasks = await this._list({ options, user, pageForce, count });
    // loop
    for (const task of tasks) {
      // locale
      task.flowNodeNameLocale = this.ctx.text(task.flowNodeName);
      if (task.flowNodeRemark) {
        task.flowNodeRemarkLocale = this.ctx.text(task.flowNodeRemark);
      }
      if (task.handleRemark) {
        task.handleRemarkLocale = this.ctx.text(task.handleRemark);
      }
    }
    return tasks;
  }

  async get({ options, user }) {
    const tasks = await this.select({ options, user });
    return tasks[0];
  }

  async claim({ flowTaskId, user }) {
    // taskInstance
    const taskInstance = await this._loadTaskInstance({ flowTaskId, user });
    return await taskInstance._claim();
  }

  async complete({ flowTaskId, handle, formAtom, user }) {
    // taskInstance
    const taskInstance = await this._loadTaskInstance({ flowTaskId, user });
    await taskInstance._complete({ handle, formAtom });
  }

  async appendHandleRemark({ flowTaskId, handle, user }) {
    // taskInstance
    const taskInstance = await this._loadTaskInstance({ flowTaskId, user, history: true });
    await taskInstance._appendHandleRemark({ handle });
  }

  async assignees({ flowTaskId, user }) {
    // taskInstance
    const taskInstance = await this._loadTaskInstance({ flowTaskId, user });
    return await taskInstance._assignees();
  }

  async assigneesConfirmation({ flowTaskId, handle, user }) {
    // taskInstance
    const taskInstance = await this._loadTaskInstance({ flowTaskId, user });
    await taskInstance._assigneesConfirmation({ handle });
  }

  async recall({ flowTaskId, user }) {
    // taskInstance
    const taskInstance = await this._loadTaskInstance({ flowTaskId, user });
    await taskInstance._recall();
  }

  async cancelFlow({ flowTaskId, handle, user }) {
    // taskInstance
    const taskInstance = await this._loadTaskInstance({ flowTaskId, user });
    await taskInstance._cancelFlow({ handle });
  }

  // from history
  async viewAtom({ flowTaskId, user, throwError }) {
    // taskInstance
    const taskInstance = await this._loadTaskInstance({ flowTaskId, user, history: true, throwError });
    if (!taskInstance) return null;
    return await taskInstance._viewAtom();
  }

  // from runtime
  async editAtom({ flowTaskId, user, throwError }) {
    // taskInstance
    const taskInstance = await this._loadTaskInstance({ flowTaskId, user, history: false, throwError });
    if (!taskInstance) return null;
    return await taskInstance._editAtom();
  }

  async forward({ flowTaskId, handle, user }) {
    // taskInstance
    const taskInstance = await this._loadTaskInstance({ flowTaskId, user });
    await taskInstance._forward({ handle });
  }

  async forwardRecall({ flowTaskId, user }) {
    // taskInstance
    const taskInstance = await this._loadTaskInstance({ flowTaskId, user });
    await taskInstance._forwardRecall();
  }

  async substitute({ flowTaskId, handle, user }) {
    // taskInstance
    const taskInstance = await this._loadTaskInstance({ flowTaskId, user });
    await taskInstance._substitute({ handle });
  }

  async substituteRecall({ flowTaskId, user }) {
    // taskInstance
    const taskInstance = await this._loadTaskInstance({ flowTaskId, user });
    await taskInstance._substituteRecall();
  }

  async actions({ flowTaskId, user }) {
    // taskInstance
    const taskInstance = await this._loadTaskInstance({ flowTaskId, user });
    await taskInstance._actions();
  }
};
