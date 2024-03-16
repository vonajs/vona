import { LocalFlowTask } from '../../index.js';
import { __ThisModule__ } from '../../resource/this.js';
import { BeanFlowTask0 } from './bean.flowTask_0.js';

export class BeanFlowTask1 extends BeanFlowTask0 {
  async _list({ options: { where, orders, page, mode, history = 0 }, user, pageForce = true, count = 0 }) {
    // special for mode
    if (mode === 'claimings') {
      where['a.flowTaskStatus'] = 0;
      where['a.timeClaimed'] = null;
      history = 0;
    } else if (mode === 'handlings') {
      where['a.flowTaskStatus'] = 0;
      where['a.timeClaimed'] = { op: 'notNull' };
      history = 0;
    } else if (mode === 'completeds') {
      where['a.flowTaskStatus'] = 1;
      history = 1;
    }
    // page
    page = this.ctx.bean.util.page(page, pageForce);
    // select
    const items = await this.sqlProcedure.selectTasks({
      userIdWho: user ? user.id : 0,
      where,
      orders,
      page,
      count,
      history,
    });
    return count ? this.bean.model.extractCount(items) : items;
  }

  async _loadTaskInstance({ flowTaskId, user, history, throwError = true }: any) {
    // get
    let flowTask;
    if (!history) {
      flowTask = await this.modelFlowTask.get({ id: flowTaskId });
    } else {
      flowTask = await this.modelFlowTaskHistory.get({ flowTaskId });
      if (flowTask) {
        flowTask.id = flowTaskId;
      }
    }
    if (!flowTask) {
      if (throwError) {
        this.scope.error.TaskNotFound__.throw(flowTaskId);
      } else {
        return null;
      }
    }
    // load flow node
    const nodeInstance = await this.ctx.bean.flow._loadFlowNodeInstance({ flowNodeId: flowTask.flowNodeId, history });
    // load task
    const task = this._createTaskInstance2({ nodeInstance });
    await task._load({ flowTask, user, history });
    return task;
  }

  _createTaskInstance2({ nodeInstance }: any) {
    const task = this.ctx.bean._newBean(LocalFlowTask, {
      nodeInstance,
    });
    return task;
  }

  async _createTaskInstance({ nodeInstance, userIdAssignee, user }: any) {
    const task = this._createTaskInstance2({ nodeInstance });
    await task.init({ userIdAssignee, user });
    return task;
  }

  _getNodeDefOptionsTask({ nodeInstance }: any) {
    return nodeInstance._getNodeDefOptionsTask();
  }

  async _clearRemains({ nodeInstance }: any) {
    const flowNodeId = nodeInstance.contextNode._flowNodeId;
    // notify
    const _tasks = await this.modelFlowTask.select({
      where: { flowNodeId },
    });
    for (const _task of _tasks) {
      this._notifyTaskClaimings(_task.userIdAssignee);
      this._notifyTaskHandlings(_task.userIdAssignee);
    }
    // flowTask delete
    await this.modelFlowTask.delete({ flowNodeId });
    // flowTaskHistory
    //   1. delete specificFlag=2
    await this.modelFlowTaskHistory.delete({
      flowNodeId,
      flowTaskStatus: 0,
      specificFlag: 2,
    });
    //   2. close
    //    flowTaskStatus:1
    //    handleStatus: not changed
    await this.modelFlowTaskHistory.update(
      {
        flowTaskStatus: 1,
      },
      {
        where: {
          flowNodeId,
          flowTaskStatus: 0,
        },
      },
    );
  }

  _notifyTaskClaimings(userId) {
    if (userId) {
      this.ctx.bean.stats.notify({
        module: __ThisModule__,
        name: 'taskClaimings',
        user: { id: userId },
      });
    }
  }

  _notifyTaskHandlings(userId) {
    if (userId) {
      this.ctx.bean.stats.notify({
        module: __ThisModule__,
        name: 'taskHandlings',
        user: { id: userId },
      });
    }
  }
}
