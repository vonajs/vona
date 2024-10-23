import { ScopeModule } from '../resource/this.js';
import { Service, BeanBase } from 'vona';

@Service()
export class ServiceRight extends BeanBase<ScopeModule> {
  get modelFlowTask() {
    return this.scope.model.flowTask;
  }
  _check_specificFlag_normal({ flowTask }: any) {
    if (flowTask.specificFlag === 1 || flowTask.specificFlag === 2) this.ctx.throw(403);
  }
  _check_specificFlag_0({ flowTask }: any) {
    if (flowTask.specificFlag !== 0) this.ctx.throw(403);
  }
  _check_specificFlag_1({ flowTask }: any) {
    if (flowTask.specificFlag !== 1) this.ctx.throw(403);
  }
  _check_specificFlag_2({ flowTask }: any) {
    if (flowTask.specificFlag !== 2) this.ctx.throw(403);
  }
  _check_sameUser({ flowTask, user }: any) {
    const flowTaskId = flowTask.flowTaskId || flowTask.id;
    // must be the same user
    if (user && user.id !== 0 && user.id !== flowTask.userIdAssignee) {
      this.scope.error.TaskCannotBeAccessed__.throw(flowTaskId);
    }
  }
  _check_notDone({ flowTask }: any) {
    const flowTaskId = flowTask.flowTaskId || flowTask.id;
    // not complete
    if (flowTask.flowTaskStatus === 1) {
      this.scope.error.TaskHasBeenHandled__.throw(flowTaskId);
    }
  }
  _check_notDoneAndHandled({ flowTask }: any) {
    const flowTaskId = flowTask.flowTaskId || flowTask.id;
    // not complete and not handled
    if (flowTask.flowTaskStatus === 1 || flowTask.handleStatus !== 0) {
      this.scope.error.TaskHasBeenHandled__.throw(flowTaskId);
    }
  }
  _check_claimed({ flowTask }: any) {
    const flowTaskId = flowTask.flowTaskId || flowTask.id;
    // timeClaimed first
    if (!flowTask.timeClaimed) {
      this.scope.error.TaskShouldBeClaimedFirst__.throw(flowTaskId);
    }
  }
  async _getNodeOptionsTask({ getOptions, flowTask, nodeInstance }: any) {
    if (getOptions) return await getOptions();
    if (!nodeInstance) {
      nodeInstance = await this.ctx.bean.flow._loadFlowNodeInstance({ flowNodeId: flowTask.flowNodeId });
    }
    return this.ctx.bean.flowTask._getNodeDefOptionsTask({ nodeInstance });
  }
  async _getTask({ getTask, flowTaskId }: any) {
    if (getTask) return await getTask(flowTaskId);
    return await this.modelFlowTask.get({ id: flowTaskId });
  }
  async viewAtom({ flowTask, user }: any) {
    // must be the same user
    this._check_sameUser({ flowTask, user });
  }
  async editAtom({ flowTask, user }: any) {
    // must be the same user
    this._check_sameUser({ flowTask, user });
    // not complete
    this._check_notDoneAndHandled({ flowTask });
  }
  async appendHandleRemark({ flowTask, user, flowNodeType }: any) {
    const flowTaskId = flowTask.flowTaskId || flowTask.id;
    // must be the same user
    this._check_sameUser({ flowTask, user });
    // more check
    if (flowNodeType !== 'startEventAtom' || flowTask.flowTaskStatus !== 1 || flowTask.handleRemark) {
      this.scope.error.TaskHandleRemarkCannotBeAppended__.throw(flowTaskId);
    }
  }
  async assignees({ flowTask, user }: any) {
    // specificFlag must be 1
    this._check_specificFlag_1({ flowTask });
    // must be the same user
    this._check_sameUser({ flowTask, user });
    // not complete
    this._check_notDoneAndHandled({ flowTask });
    // timeClaimed first
    this._check_claimed({ flowTask });
  }
  async assigneesConfirmation({ flowTask, user }: any) {
    // same as assignees
    return await this.assignees({ flowTask, user });
  }
  async cancelFlow({ flowTask, user, getOptions, disableCheckTimeClaimed }: any) {
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
      this.scope.error.FlowCannotBeCancelled__.throw(flowTaskId);
    }
  }
  async claim({ flowTask, user }: any) {
    // must be the same user
    this._check_sameUser({ flowTask, user });
    // not complete
    this._check_notDoneAndHandled({ flowTask });
    // check: not throw error
    // if (flowTask.timeClaimed) this.scope.error.TaskHasBeenClaimed__.throw(flowTaskId);
    if (flowTask.timeClaimed) {
      return { timeClaimed: flowTask.timeClaimed };
    }
  }
  async complete({ flowTask, user, handle, getOptions, disableCheckTimeClaimed }: any) {
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
        this.scope.error.TaskCannotBePassed__.throw(flowTaskId);
      }
      if (handle.status === 2 && !options.allowRejectTask) {
        this.scope.error.TaskCannotBeRejected__.throw(flowTaskId);
      }
    } else if (!options.allowPassTask && !options.allowRejectTask) {
      this.ctx.throw(403);
    }
  }
  async recall({ flowTask, user }: any) {
    // specificFlag must be 2
    this._check_specificFlag_2({ flowTask });
    // must be the same user
    this._check_sameUser({ flowTask, user });
    // not complete
    this._check_notDoneAndHandled({ flowTask });
    // timeClaimed first
    this._check_claimed({ flowTask });
  }
  async forward({ flowTask, user, getOptions, disableCheckTimeClaimed }: any) {
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
      this.scope.error.TaskHasBeenForwarded__.throw(flowTaskId);
    }
  }
  async forwardRecall({ flowTask, user, getOptions, getTask }: any) {
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
  async substitute({ flowTask, user, getOptions, disableCheckTimeClaimed }: any) {
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
      this.scope.error.TaskHasBeenSubstituted__.throw(flowTaskId);
    }
  }
  async substituteRecall({ flowTask, user, getOptions, getTask }: any) {
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
}
