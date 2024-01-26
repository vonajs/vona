import { LocalFlowTaskAppendHandleRemark } from './local.flow.task_appendHandleRemark.js';

export class LocalFlowTaskAssignees extends LocalFlowTaskAppendHandleRemark {
  async _assignees() {
    // user
    const user = this.contextTask._user;
    // flowTask
    const flowTask = this.contextTask._flowTask;
    // check right
    await this.localRight.assignees({ flowTask, user });
    // handle
    return await this._assignees_handle();
  }

  async _assignees_handle() {
    // assignees
    const assignees = this.contextNode.vars.get('_assignees');
    // users
    let users;
    if (!assignees || assignees.length === 0) {
      users = [];
    } else {
      users = await this.ctx.bean.user.select({
        options: {
          where: {
            'f.disabled': 0,
            'f.id': assignees,
          },
          orders: [['f.userName', 'asc']],
          removePrivacy: true,
        },
      });
    }
    // options
    const options = this.ctx.bean.flowTask._getNodeDefOptionsTask({ nodeInstance: this.nodeInstance });
    // ok
    return {
      users,
      options: {
        confirmationAllowAppend: options.confirmationAllowAppend,
      },
    };
  }

  async _assigneesConfirmation({ handle }) {
    // user
    const user = this.contextTask._user;
    // flowTask
    const flowTask = this.contextTask._flowTask;
    // check right
    await this.localRight.assigneesConfirmation({ flowTask, user });
    // handle
    await this._assigneesConfirmation_handle({ handle });
    // notify
    this._notifyTaskHandlings(flowTask.userIdAssignee);
  }

  async _assigneesConfirmation_handle({ handle }) {
    // options
    const options = this.ctx.bean.flowTask._getNodeDefOptionsTask({ nodeInstance: this.nodeInstance });
    // flowTaskHistory update
    this.contextTask._flowTaskHistory.flowTaskStatus = 1;
    this.contextTask._flowTaskHistory.timeHandled = new Date();
    this.contextTask._flowTaskHistory.handleStatus = handle.status;
    await this.modelFlowTaskHistory.update(this.contextTask._flowTaskHistory);
    // delete flowTask and flowTaskHistory
    const flowTaskId = this.contextTask._flowTaskId;
    await this.modelFlowTask.delete({ id: flowTaskId });
    await this.modelFlowTaskHistory.delete({ flowTaskId });
    // passed
    if (handle.status === 1) {
      // assignees
      const assignees = await this.flowInstance._parseAssignees({
        nodeInstance: this.nodeInstance,
        assignees: handle.assignees,
      });
      if (!assignees || assignees.length === 0) {
        this.ctx.throw.module(__ThisModule__, 1008, flowTaskId);
      }
      // check confirmationAllowAppend
      if (!options.confirmationAllowAppend) {
        const assigneesOld = this.contextNode.vars.get('_assignees');
        if (!new Set(assigneesOld).isSuperset(new Set(assignees))) {
          this.ctx.throw.module(__ThisModule__, 1009, flowTaskId);
        }
      }
      // save var: _assigneesConfirmed
      this.contextNode.vars.set('_assigneesConfirmed', assignees);
      // next stage of flow node: begin
      return await this.nodeInstance.begin();
    }
    // reject
    if (handle.status === 2) {
      return await this.ctx.bean.flowTask._gotoFlowNodePrevious({
        nodeInstance: this.nodeInstance,
        rejectedNode: null,
      });
    }
  }
}
