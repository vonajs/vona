const moduleInfo = module.info;
module.exports = class FlowTask {
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
    const sql = this.sqlProcedure.selectTasks({
      iid: this.ctx.instance.id,
      userIdWho: user ? user.id : 0,
      where,
      orders,
      page,
      count,
      history,
    });
    const res = await this.ctx.model.query(sql);
    return count ? res[0]._count : res;
  }

  async _loadTaskInstance({ flowTaskId, user, history, throwError = true }) {
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
        this.ctx.throw.module(moduleInfo.relativeName, 1001, flowTaskId);
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

  _createTaskInstance2({ nodeInstance }) {
    const task = this.ctx.bean._newBean(`${moduleInfo.relativeName}.local.flow.task`, {
      nodeInstance,
    });
    return task;
  }

  async _createTaskInstance({ nodeInstance, userIdAssignee, user }) {
    const task = this._createTaskInstance2({ nodeInstance });
    await task.init({ userIdAssignee, user });
    return task;
  }

  _getNodeDefOptionsTask({ nodeInstance }) {
    return nodeInstance._getNodeDefOptionsTask();
  }

  async _clearRemains({ nodeInstance }) {
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
    await this.ctx.model.query(
      `
        update aFlowTaskHistory set deleted=1
          where iid=? and deleted=0 and flowNodeId=? and flowTaskStatus=0 and specificFlag=2 
        `,
      [this.ctx.instance.id, flowNodeId]
    );
    //   2. close
    //    flowTaskStatus:1
    //    handleStatus: not changed
    await this.ctx.model.query(
      `
        update aFlowTaskHistory set flowTaskStatus=1
          where iid=? and deleted=0 and flowNodeId=? and flowTaskStatus=0
        `,
      [this.ctx.instance.id, flowNodeId]
    );
  }

  _notifyTaskClaimings(userId) {
    if (userId) {
      this.ctx.bean.stats.notify({
        module: moduleInfo.relativeName,
        name: 'taskClaimings',
        user: { id: userId },
      });
    }
  }

  _notifyTaskHandlings(userId) {
    if (userId) {
      this.ctx.bean.stats.notify({
        module: moduleInfo.relativeName,
        name: 'taskHandlings',
        user: { id: userId },
      });
    }
  }
};
