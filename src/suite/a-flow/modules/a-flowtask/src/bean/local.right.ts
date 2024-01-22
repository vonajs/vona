const moduleInfo = module.info;
module.exports = class Right {
  get modelFlowTask() {
    return this.ctx.model.module(moduleInfo.relativeName).flowTask;
  }
  _check_specificFlag_normal({ flowTask }) {
    if (flowTask.specificFlag === 1 || flowTask.specificFlag === 2) this.ctx.throw(403);
  }
  _check_specificFlag_0({ flowTask }) {
    if (flowTask.specificFlag !== 0) this.ctx.throw(403);
  }
  _check_specificFlag_1({ flowTask }) {
    if (flowTask.specificFlag !== 1) this.ctx.throw(403);
  }
  _check_specificFlag_2({ flowTask }) {
    if (flowTask.specificFlag !== 2) this.ctx.throw(403);
  }
  _check_sameUser({ flowTask, user }) {
    const flowTaskId = flowTask.flowTaskId || flowTask.id;
    // must be the same user
    if (user && user.id !== 0 && user.id !== flowTask.userIdAssignee) {
      this.ctx.throw.module(moduleInfo.relativeName, 1002, flowTaskId);
    }
  }
  _check_notDone({ flowTask }) {
    const flowTaskId = flowTask.flowTaskId || flowTask.id;
    // not complete
    if (flowTask.flowTaskStatus === 1) {
      this.ctx.throw.module(moduleInfo.relativeName, 1005, flowTaskId);
    }
  }
  _check_notDoneAndHandled({ flowTask }) {
    const flowTaskId = flowTask.flowTaskId || flowTask.id;
    // not complete and not handled
    if (flowTask.flowTaskStatus === 1 || flowTask.handleStatus !== 0) {
      this.ctx.throw.module(moduleInfo.relativeName, 1005, flowTaskId);
    }
  }
  _check_claimed({ flowTask }) {
    const flowTaskId = flowTask.flowTaskId || flowTask.id;
    // timeClaimed first
    if (!flowTask.timeClaimed) {
      this.ctx.throw.module(moduleInfo.relativeName, 1004, flowTaskId);
    }
  }
  async _getNodeOptionsTask({ getOptions, flowTask, nodeInstance }) {
    if (getOptions) return await getOptions();
    if (!nodeInstance) {
      nodeInstance = await this.ctx.bean.flow._loadFlowNodeInstance({ flowNodeId: flowTask.flowNodeId });
    }
    return this.ctx.bean.flowTask._getNodeDefOptionsTask({ nodeInstance });
  }
  async _getTask({ getTask, flowTaskId }) {
    if (getTask) return await getTask(flowTaskId);
    return await this.modelFlowTask.get({ id: flowTaskId });
  }
  async viewAtom({ flowTask, user }) {
    // must be the same user
    this._check_sameUser({ flowTask, user });
  }
  async editAtom({ flowTask, user }) {
    // must be the same user
    this._check_sameUser({ flowTask, user });
    // not complete
    this._check_notDoneAndHandled({ flowTask });
  }
  async appendHandleRemark({ flowTask, user, flowNodeType }) {
    const flowTaskId = flowTask.flowTaskId || flowTask.id;
    // must be the same user
    this._check_sameUser({ flowTask, user });
    // more check
    if (flowNodeType !== 'startEventAtom' || flowTask.flowTaskStatus !== 1 || flowTask.handleRemark) {
      this.ctx.throw.module(moduleInfo.relativeName, 1011, flowTaskId);
    }
  }
  async assignees({ flowTask, user }) {
    // specificFlag must be 1
    this._check_specificFlag_1({ flowTask });
    // must be the same user
    this._check_sameUser({ flowTask, user });
    // not complete
    this._check_notDoneAndHandled({ flowTask });
    // timeClaimed first
    this._check_claimed({ flowTask });
  }
  async assigneesConfirmation({ flowTask, user }) {
    // same as assignees
    return await this.assignees({ flowTask, user });
  }
  async cancelFlow({ flowTask, user, getOptions, disableCheckTimeClaimed }) {
    const flowTaskId = flowTask.flowTaskId || flowTask.id;
    // specificFlag must be normal
    this._check_specificFlag_normal({ flowTask });
    // must be the same user
    this._check_sameUser({ flowTask, user });
    // not complete
    this._check_notDoneAndHandled({ flowTask });
    // timeClaimed first
    if (!disableCheckTimeClaimed) {
      this._check_claimed({ flowTask });
    }
    // options
    const options = await this._getNodeOptionsTask({ getOptions, flowTask });
    // check if allowCancelFlow
    if (!options.allowCancelFlow) {
      this.ctx.throw.module(moduleInfo.relativeName, 1010, flowTaskId);
    }
  }
  async claim({ flowTask, user }) {
    // must be the same user
    this._check_sameUser({ flowTask, user });
    // not complete
    this._check_notDoneAndHandled({ flowTask });
    // check: not throw error
    // if (flowTask.timeClaimed) this.ctx.throw.module(moduleInfo.relativeName, 1003, flowTaskId);
    if (flowTask.timeClaimed) {
      return { timeClaimed: flowTask.timeClaimed };
    }
  }
  async complete({ flowTask, user, handle, getOptions, disableCheckTimeClaimed }) {
    const flowTaskId = flowTask.flowTaskId || flowTask.id;
    // specificFlag must be normal
    this._check_specificFlag_normal({ flowTask });
    // must be the same user
    this._check_sameUser({ flowTask, user });
    // not complete
    this._check_notDoneAndHandled({ flowTask });
    // timeClaimed first
    if (!disableCheckTimeClaimed) {
      this._check_claimed({ flowTask });
    }
    // options
    const options = await this._getNodeOptionsTask({ getOptions, flowTask });
    // check if pass/reject
    if (handle) {
      if (handle.status === 1 && !options.allowPassTask) {
        this.ctx.throw.module(moduleInfo.relativeName, 1006, flowTaskId);
      }
      if (handle.status === 2 && !options.allowRejectTask) {
        this.ctx.throw.module(moduleInfo.relativeName, 1007, flowTaskId);
      }
    } else if (!options.allowPassTask && !options.allowRejectTask) {
      this.ctx.throw(403);
    }
  }
  async recall({ flowTask, user }) {
    // specificFlag must be 2
    this._check_specificFlag_2({ flowTask });
    // must be the same user
    this._check_sameUser({ flowTask, user });
    // not complete
    this._check_notDoneAndHandled({ flowTask });
    // timeClaimed first
    this._check_claimed({ flowTask });
  }
  async forward({ flowTask, user, getOptions, disableCheckTimeClaimed }) {
    const flowTaskId = flowTask.flowTaskId || flowTask.id;
    // must be the same user
    this._check_sameUser({ flowTask, user });
    // not complete
    this._check_notDoneAndHandled({ flowTask });
    // timeClaimed first
    if (!disableCheckTimeClaimed) {
      this._check_claimed({ flowTask });
    }
    // check if flowTaskIdSubstituteFrom
    if (flowTask.flowTaskIdSubstituteFrom) {
      this.ctx.throw(403);
    }
    // options
    const options = await this._getNodeOptionsTask({ getOptions, flowTask });
    if (!options.allowForward || flowTask.flowTaskIdForwardTo) {
      this.ctx.throw.module(moduleInfo.relativeName, 1012, flowTaskId);
    }
  }
  async forwardRecall({ flowTask, user, getOptions, getTask }) {
    // must be the same user
    this._check_sameUser({ flowTask, user });
    // not complete
    this._check_notDone({ flowTask });
    // timeClaimed first
    this._check_claimed({ flowTask });
    // options
    const options = await this._getNodeOptionsTask({ getOptions, flowTask });
    if (!options.allowForward || !flowTask.flowTaskIdForwardTo) {
      this.ctx.throw(403);
    }
    // check if claimed
    const taskTo = await this._getTask({ getTask, flowTaskId: flowTask.flowTaskIdForwardTo });
    if (taskTo.timeClaimed) {
      this.ctx.throw(403);
    }
  }
  async substitute({ flowTask, user, getOptions, disableCheckTimeClaimed }) {
    const flowTaskId = flowTask.flowTaskId || flowTask.id;
    // must be the same user
    this._check_sameUser({ flowTask, user });
    // not complete
    this._check_notDoneAndHandled({ flowTask });
    // timeClaimed first
    if (!disableCheckTimeClaimed) {
      this._check_claimed({ flowTask });
    }
    // options
    const options = await this._getNodeOptionsTask({ getOptions, flowTask });
    // allowed only once, so should check flowTaskIdSubstituteFrom
    if (!options.allowSubstitute || flowTask.flowTaskIdSubstituteFrom || flowTask.flowTaskIdSubstituteTo) {
      this.ctx.throw.module(moduleInfo.relativeName, 1013, flowTaskId);
    }
  }
  async substituteRecall({ flowTask, user, getOptions, getTask }) {
    // must be the same user
    this._check_sameUser({ flowTask, user });
    // not complete
    this._check_notDone({ flowTask });
    // timeClaimed first
    this._check_claimed({ flowTask });
    // options
    const options = await this._getNodeOptionsTask({ getOptions, flowTask });
    // allowed only once, so should check flowTaskIdSubstituteFrom
    if (!options.allowSubstitute || flowTask.flowTaskIdSubstituteFrom || !flowTask.flowTaskIdSubstituteTo) {
      this.ctx.throw(403);
    }
    // check if claimed
    const taskTo = await this._getTask({ getTask, flowTaskId: flowTask.flowTaskIdSubstituteTo });
    if (taskTo.timeClaimed) {
      this.ctx.throw(403);
    }
  }
};
