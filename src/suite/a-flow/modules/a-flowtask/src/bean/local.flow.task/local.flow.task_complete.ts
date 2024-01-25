import { LocalFlowTaskClaim } from './local.flow.task_claim.js';

export class LocalFlowTaskComplete extends LocalFlowTaskClaim {
  async _complete({ handle, formAtom }) {
    // user
    const user = this.contextTask._user;
    // flowTask
    const flowTask = this.contextTask._flowTask;
    // options
    const options = this._getNodeOptionsTask();
    // check right
    await this.localRight.complete({ flowTask, user, handle, getOptions: () => options });
    // formAtom
    if (formAtom) {
      await this._complete_formAtom({ formAtom });
    }
    // handle
    if (handle) {
      await this._complete_handle({ handle, options });
      // event: task.completed
      await this.raiseEventCompleted();
      // check if node done
      this.ctx.tail(async () => {
        await this._complete_tail({ flowTask, user });
      });
      // notify
      this._notifyTaskHandlings(flowTask.userIdAssignee);
    }
  }

  async _complete_tail({ flowTask, user }) {
    const flowNodeId = flowTask.flowNodeId;
    await this.ctx.meta.util.lock({
      resource: `${moduleInfo.relativeName}.flowTask.nodeDoneCheck.${flowNodeId}`,
      fn: async () => {
        return await this.ctx.meta.util.executeBeanIsolate({
          beanModule: moduleInfo.relativeName,
          beanFullName: 'flowTask',
          context: { flowNodeId },
          fn: '_nodeDoneCheckLock',
          transaction: true,
          ctxParent: { state: { user: { op: user } } },
        });
      },
    });
  }

  async _complete_formAtom({ formAtom }) {
    // write
    const atomId = this.context._atom.atomId;
    const atomClassId = this.context._atom.atomClassId;
    const flowTaskId = this.contextTask._flowTaskId;
    const user = this.contextTask._user;
    await this.ctx.bean.atom.write({
      key: { atomId },
      atomClass: { id: atomClassId },
      item: formAtom,
      options: { flowTaskId },
      user,
    });
  }

  async _complete_handle({ handle, options }) {
    const timeHandled = new Date();
    // flowTask
    this.contextTask._flowTask.flowTaskStatus = 1;
    this.contextTask._flowTask.timeHandled = timeHandled;
    this.contextTask._flowTask.handleStatus = handle.status;
    this.contextTask._flowTask.handleRemark = handle.remark;
    await this.modelFlowTask.update(this.contextTask._flowTask);
    // flowTaskHistory
    this.contextTask._flowTaskHistory.flowTaskStatus = 1;
    this.contextTask._flowTaskHistory.timeHandled = timeHandled;
    this.contextTask._flowTaskHistory.handleStatus = handle.status;
    this.contextTask._flowTaskHistory.handleRemark = handle.remark;
    await this.modelFlowTaskHistory.update(this.contextTask._flowTaskHistory);
    // fileds mapping
    await this._complete_handle_fieldsMapping({ handle, options });
    // special for forward
    await this._complete_handle_checkForward();
    // special for substitute
    await this._complete_handle_checkSubstitute();
  }

  async _complete_handle_fieldsMapping({ handle, options }) {
    // check handle status
    if (handle.status !== 1) return;
    // fieldsMapping
    const fieldsMapping = options && options.fieldsMapping;
    if (!fieldsMapping) return;
    const keys = Object.keys(fieldsMapping);
    if (keys.length === 0) return;
    // atom
    const atom = this.context._atom;
    const atomId = atom.atomId;
    const user = this.contextTask.user;
    const data = {};
    for (const key of keys) {
      const conditionExpression = fieldsMapping[key];
      // evaluateExpression
      const fieldValue = this.ctx.bean.flow.evaluateExpression({
        expression: conditionExpression,
        globals: {
          context: this.context,
          contextNode: this.contextNode,
          contextTask: this.contextTask,
          atom,
          user,
          handle,
        },
      });
      if (fieldValue !== undefined) {
        atom[key] = fieldValue;
        data[key] = fieldValue;
      }
    }
    // write
    await this.ctx.bean.atom.write({
      key: { atomId },
      item: data,
      options: { ignoreValidate: true },
      user,
    });
  }

  async _complete_handle_checkForward() {
    let flowTaskIdForwardFrom = this.contextTask._flowTask.flowTaskIdForwardFrom;
    if (!flowTaskIdForwardFrom) return;
    while (flowTaskIdForwardFrom) {
      const taskFrom = await this.modelFlowTask.get({ id: flowTaskIdForwardFrom });
      await this.modelFlowTask.update({
        id: flowTaskIdForwardFrom,
        flowTaskStatus: 1,
      });
      await this.modelFlowTaskHistory.update(
        {
          flowTaskStatus: 1,
        },
        {
          where: {
            flowTaskId: flowTaskIdForwardFrom,
          },
        },
      );
      // notify
      this._notifyTaskHandlings(taskFrom.userIdAssignee);
      // next
      flowTaskIdForwardFrom = taskFrom.flowTaskIdForwardFrom;
    }
  }

  async _complete_handle_checkSubstitute() {
    let flowTaskIdSubstituteFrom = this.contextTask._flowTask.flowTaskIdSubstituteFrom;
    if (!flowTaskIdSubstituteFrom) return;
    while (flowTaskIdSubstituteFrom) {
      const taskFrom = await this.modelFlowTask.get({ id: flowTaskIdSubstituteFrom });
      await this.modelFlowTask.update({
        id: flowTaskIdSubstituteFrom,
        flowTaskStatus: 1,
      });
      await this.modelFlowTaskHistory.update(
        {
          flowTaskStatus: 1,
        },
        {
          where: {
            flowTaskId: flowTaskIdSubstituteFrom,
          },
        },
      );
      // notify
      this._notifyTaskHandlings(taskFrom.userIdAssignee);
      // next
      flowTaskIdSubstituteFrom = taskFrom.flowTaskIdSubstituteFrom;
    }
  }

  // async _complete_formAtom({ formAtom }) {
  //   // schemaWrite
  //   const schemaWrite = await this._getSchema();
  //   if (!schemaWrite) return;
  //   // write
  //   const atomId = this.context._atom.atomId;
  //   const user = this.contextTask._user;
  //   await this.ctx.bean.atom.write({
  //     key: { atomId },
  //     item: formAtom,
  //     options: { schema: schemaWrite },
  //     user,
  //   });
  // }
}
