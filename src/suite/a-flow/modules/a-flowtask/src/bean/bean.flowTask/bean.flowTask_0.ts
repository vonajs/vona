import { cast } from 'vona';
import { BigNumber } from 'bignumber.js';
import { ScopeModule } from '../../.metadata/this.js';
import { BeanBase } from 'vona';
import { BeanFlowTask } from '../bean.flowTask.js';

export class BeanFlowTask0 extends BeanBase {
  get self() {
    return cast<BeanFlowTask>(this);
  }

  get modelFlowTask() {
    return this.scope.model.flowTask;
  }
  get modelFlowTaskHistory() {
    return this.scope.model.flowTaskHistory;
  }
  get localRight() {
    return this.scope.service.right;
  }
  get sqlProcedure() {
    return this.scope.service.procedure;
  }

  async count({ options, user }: any): Promise<BigNumber> {
    return (await this._select({ options, user, count: 1 })) as BigNumber;
  }

  async select({ options, user, pageForce = true }: any) {
    return (await this._select({ options, user, pageForce, count: 0 })) as any[];
  }

  async _select({ options, user, pageForce = true, count = 0 }: any) {
    const tasks = await this.self._list({ options, user, pageForce, count });
    if (count === 1) return tasks as BigNumber;
    // loop
    for (const task of tasks as any[]) {
      // locale
      task.flowNodeNameLocale = this.app.text(task.flowNodeName);
      if (task.flowNodeRemark) {
        task.flowNodeRemarkLocale = this.app.text(task.flowNodeRemark);
      }
      if (task.handleRemark) {
        task.handleRemarkLocale = this.app.text(task.handleRemark);
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
    const taskInstance = await this.self._loadTaskInstance({ flowTaskId, user });
    return await taskInstance!._claim();
  }

  async complete({ flowTaskId, handle, formAtom, user }: any) {
    // taskInstance
    const taskInstance = await this.self._loadTaskInstance({ flowTaskId, user });
    await taskInstance!._complete({ handle, formAtom });
  }

  async appendHandleRemark({ flowTaskId, handle, user }: any) {
    // taskInstance
    const taskInstance = await this.self._loadTaskInstance({
      flowTaskId,
      user,
      history: true,
    });
    await taskInstance!._appendHandleRemark({ handle });
  }

  async assignees({ flowTaskId, user }: any) {
    // taskInstance
    const taskInstance = await this.self._loadTaskInstance({ flowTaskId, user });
    return await taskInstance!._assignees();
  }

  async assigneesConfirmation({ flowTaskId, handle, user }: any) {
    // taskInstance
    const taskInstance = await this.self._loadTaskInstance({ flowTaskId, user });
    await taskInstance!._assigneesConfirmation({ handle });
  }

  async recall({ flowTaskId, user }: any) {
    // taskInstance
    const taskInstance = await this.self._loadTaskInstance({ flowTaskId, user });
    await taskInstance!._recall();
  }

  async cancelFlow({ flowTaskId, handle, user }: any) {
    // taskInstance
    const taskInstance = await this.self._loadTaskInstance({ flowTaskId, user });
    await taskInstance!._cancelFlow({ handle });
  }

  // from history
  async viewAtom({ flowTaskId, user, throwError }: any) {
    // taskInstance
    const taskInstance = await this.self._loadTaskInstance({
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
    const taskInstance = await this.self._loadTaskInstance({
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
    const taskInstance = await this.self._loadTaskInstance({ flowTaskId, user });
    await taskInstance!._forward({ handle });
  }

  async forwardRecall({ flowTaskId, user }: any) {
    // taskInstance
    const taskInstance = await this.self._loadTaskInstance({ flowTaskId, user });
    await taskInstance!._forwardRecall();
  }

  async substitute({ flowTaskId, handle, user }: any) {
    // taskInstance
    const taskInstance = await this.self._loadTaskInstance({ flowTaskId, user });
    await taskInstance!._substitute({ handle });
  }

  async substituteRecall({ flowTaskId, user }: any) {
    // taskInstance
    const taskInstance = await this.self._loadTaskInstance({ flowTaskId, user });
    await taskInstance!._substituteRecall();
  }

  async actions({ flowTaskId, user }: any) {
    // taskInstance
    const taskInstance = await this.self._loadTaskInstance({ flowTaskId, user });
    await taskInstance!._actions();
  }
}
