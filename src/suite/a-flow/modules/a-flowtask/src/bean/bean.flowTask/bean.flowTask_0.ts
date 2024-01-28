import { Cast } from '@cabloy/core';
import { ScopeModule } from '../../resource/this.js';
import { BeanBase } from '@cabloy/core';
import { BeanFlowTask1 } from './bean.flowTask_1.js';

export class BeanFlowTask0 extends BeanBase<ScopeModule> {
  get modelFlowTask() {
    return this.scope.model.flowTask;
  }
  get modelFlowTaskHistory() {
    return this.scope.model.flowTaskHistory;
  }
  get localRight() {
    return this.scope.local.right;
  }
  get sqlProcedure() {
    return this.scope.local.procedure;
  }

  async count({ options, user }: any) {
    return await this.select({ options, user, count: 1 });
  }

  async select({ options, user, pageForce = true, count = 0 }: any) {
    const tasks = await Cast<BeanFlowTask1>(this)._list({ options, user, pageForce, count });
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

  async get({ options, user }: any) {
    const tasks = await this.select({ options, user });
    return tasks[0];
  }

  async claim({ flowTaskId, user }: any) {
    // taskInstance
    const taskInstance = await Cast<BeanFlowTask1>(this)._loadTaskInstance({ flowTaskId, user });
    return await taskInstance!._claim();
  }

  async complete({ flowTaskId, handle, formAtom, user }: any) {
    // taskInstance
    const taskInstance = await Cast<BeanFlowTask1>(this)._loadTaskInstance({ flowTaskId, user });
    await taskInstance!._complete({ handle, formAtom });
  }

  async appendHandleRemark({ flowTaskId, handle, user }: any) {
    // taskInstance
    const taskInstance = await Cast<BeanFlowTask1>(this)._loadTaskInstance({
      flowTaskId,
      user,
      history: true,
    });
    await taskInstance!._appendHandleRemark({ handle });
  }

  async assignees({ flowTaskId, user }: any) {
    // taskInstance
    const taskInstance = await Cast<BeanFlowTask1>(this)._loadTaskInstance({ flowTaskId, user });
    return await taskInstance!._assignees();
  }

  async assigneesConfirmation({ flowTaskId, handle, user }: any) {
    // taskInstance
    const taskInstance = await Cast<BeanFlowTask1>(this)._loadTaskInstance({ flowTaskId, user });
    await taskInstance!._assigneesConfirmation({ handle });
  }

  async recall({ flowTaskId, user }: any) {
    // taskInstance
    const taskInstance = await Cast<BeanFlowTask1>(this)._loadTaskInstance({ flowTaskId, user });
    await taskInstance!._recall();
  }

  async cancelFlow({ flowTaskId, handle, user }: any) {
    // taskInstance
    const taskInstance = await Cast<BeanFlowTask1>(this)._loadTaskInstance({ flowTaskId, user });
    await taskInstance!._cancelFlow({ handle });
  }

  // from history
  async viewAtom({ flowTaskId, user, throwError }: any) {
    // taskInstance
    const taskInstance = await Cast<BeanFlowTask1>(this)._loadTaskInstance({
      flowTaskId,
      user,
      history: true,
      throwError,
    });
    if (!taskInstance) return null;
    return await taskInstance._viewAtom();
  }

  // from runtime
  async editAtom({ flowTaskId, user, throwError }: any) {
    // taskInstance
    const taskInstance = await Cast<BeanFlowTask1>(this)._loadTaskInstance({
      flowTaskId,
      user,
      history: false,
      throwError,
    });
    if (!taskInstance) return null;
    return await taskInstance._editAtom();
  }

  async forward({ flowTaskId, handle, user }: any) {
    // taskInstance
    const taskInstance = await Cast<BeanFlowTask1>(this)._loadTaskInstance({ flowTaskId, user });
    await taskInstance!._forward({ handle });
  }

  async forwardRecall({ flowTaskId, user }: any) {
    // taskInstance
    const taskInstance = await Cast<BeanFlowTask1>(this)._loadTaskInstance({ flowTaskId, user });
    await taskInstance!._forwardRecall();
  }

  async substitute({ flowTaskId, handle, user }: any) {
    // taskInstance
    const taskInstance = await Cast<BeanFlowTask1>(this)._loadTaskInstance({ flowTaskId, user });
    await taskInstance!._substitute({ handle });
  }

  async substituteRecall({ flowTaskId, user }: any) {
    // taskInstance
    const taskInstance = await Cast<BeanFlowTask1>(this)._loadTaskInstance({ flowTaskId, user });
    await taskInstance!._substituteRecall();
  }

  async actions({ flowTaskId, user }: any) {
    // taskInstance
    const taskInstance = await Cast<BeanFlowTask1>(this)._loadTaskInstance({ flowTaskId, user });
    await taskInstance!._actions();
  }
}
