import { BeanFlowTaskAtomState } from './bean.flowTask_atomState.js';

export class BeanFlowTaskFlowData extends BeanFlowTaskAtomState {
  async flowData({ flowId, options, user }) {
    options = options || {};
    // allowViewWorkflow
    const allowViewWorkflow = await this._checkViewWorkflow({ flowId, user });
    // flow
    const flow = await this._flowData_flow({ allowViewWorkflow, flowId, user });
    if (!flow) return null;
    // atom
    const atom = await this._flowData_atom({ flowId, atomId: flow.flowAtomId, atomClassId: flow.flowAtomClassId });
    // tasks
    const tasks = await this._flowData_tasks({ allowViewWorkflow, flow, atom, flowId, options, user });
    // ok
    return { allowViewWorkflow, flow, atom, tasks };
  }

  async _flowData_flow({ allowViewWorkflow, flowId, user }) {
    if (allowViewWorkflow) {
      user = { id: 0 };
    }
    // select flow
    const flow = await this.ctx.bean.flow._get({ flowId, history: true, user });
    // not throw error
    // if (!flow) this.ctx.throw(404);
    // ok
    return flow;
  }

  async _flowData_atom({ flowId, atomId, atomClassId }) {
    // only read basic info
    let atom = await this.ctx.bean.atom.model.get({ id: atomId, atomClassId });
    if (atom.atomFlowId !== flowId) {
      // this.ctx.throw(403);
      // maybe old
      return null;
    }
    const atomClass = await this.ctx.bean.atomClass.get({ id: atomClassId });
    atom = {
      ...atom,
      atomId,
      module: atomClass.module,
      atomClassName: atomClass.atomClassName,
      atomCreatedAt: atom.createdAt,
      atomUpdatedAt: atom.updatedAt,
    };
    // translate
    await this.ctx.bean.atomBase._read_handleTranslate({ item: atom, atomClass, options: null, user: null });
    // ok
    return atom;
  }

  async _flowData_tasks({ allowViewWorkflow, flow, atom, flowId, options, user }) {
    const currentOnly = options.currentOnly;
    const mineOnly = !allowViewWorkflow;
    // where
    const where = {
      'a.flowId': flowId,
      'b.flowNodeType': [
        'a-flowtask:startEventAtom',
        'a-flowtask:activityUserTask',
        'startEventAtom',
        'activityUserTask',
      ],
    };
    if (currentOnly) {
      where['a.flowTaskStatus'] = 0;
    }
    if (mineOnly) {
      where.__or__ = [{ 'a.userIdAssignee': user.id }];
    } else {
      where.__or__ = [{ 'a.userIdAssignee': user.id }, { 'a.flowTaskHidden': 0 }];
    }
    // select tasks
    let tasks = await this.ctx.bean.flowTask.select({
      options: {
        where,
        orders: [
          ['a.flowNodeId', 'desc'],
          // ['a.specificFlag', 'desc'], // need not
          ['a.flowTaskStatus', 'asc'],
          ['a.createdAt', 'desc'],
        ],
        history: currentOnly ? 0 : 1,
      },
      user: null,
      pageForce: false,
    });
    // flowOld
    const flowOld = !atom || atom.atomFlowId !== flow.flowId;
    // nodeInstances
    const nodeInstances = this._flowData_task_nodeInstancesBox();
    // map
    tasks = tasks.map(task => {
      if (task.flowTaskIdSubstituteTo) {
        const taskTo = tasks.find(item => item.flowTaskId === task.flowTaskIdSubstituteTo);
        if (user.id !== task.userIdAssignee && user.id !== taskTo.userIdAssignee) {
          taskTo.__remove = true;
          return {
            ...task,
            timeHandled: taskTo.timeHandled,
            handleStatus: taskTo.handleStatus,
            handleRemark: taskTo.handleRemark,
            handleRemarkLocale: taskTo.handleRemarkLocale,
            flowTaskIdSubstituteTo: 0,
            ignoreMark: 0,
          };
        }
      }
      return task;
    });
    // filter
    tasks = tasks.filter(task => {
      if (task.__remove) return false;
      if ((task.specificFlag === 1 || task.specificFlag === 2) && task.userIdAssignee !== user.id) return false;
      return true;
    });
    // loop
    for (const task of tasks) {
      // actions
      if (task.userIdAssignee === user.id && !flowOld) {
        task._actions = await this._flowData_task_actions({ nodeInstances, tasks, task, user });
      }
    }
    return tasks;
  }

  _flowData_task_nodeInstancesBox() {
    return {
      _nodeInstances: {},
      _options: {},
      async get(flowNodeId) {
        let nodeInstance = this._nodeInstances[flowNodeId];
        if (!nodeInstance) {
          nodeInstance = await this.ctx.bean.flow._loadFlowNodeInstance({ flowNodeId });
          this._nodeInstances[flowNodeId] = nodeInstance;
        }
        return nodeInstance;
      },
      async getOptions(flowNodeId) {
        let options = this._options[flowNodeId];
        if (!options) {
          const nodeInstance = await this.get(flowNodeId);
          options = this.ctx.bean.flowTask._getNodeDefOptionsTask({ nodeInstance });
          this._options[flowNodeId] = options;
        }
        return options;
      },
    };
  }

  async _flowData_task_checkRight(fn) {
    try {
      await fn;
      return true;
    } catch (err) {
      return false;
    }
  }

  async _flowData_task_actions({ nodeInstances, tasks, task, user }) {
    // info
    const isDone = task.flowTaskStatus === 1;
    // actions
    const actions = [];
    const flowTask = task;
    let res;
    // 1. assigneesConfirmation
    res = await this._flowData_task_checkRight(this.localRight.assigneesConfirmation({ flowTask, user }));
    if (res) {
      actions.push({
        name: 'assigneesConfirmation',
      });
      // only one action
      return actions;
    }
    // 2. recall
    res = await this._flowData_task_checkRight(this.localRight.recall({ flowTask, user }));
    if (res) {
      actions.push({
        name: 'recall',
      });
      // only one action
      return actions;
    }
    // 3. claim
    if (!isDone && !task.timeClaimed) {
      const options = await nodeInstances.getOptions(task.flowNodeId);
      actions.push({
        name: 'claim',
        options: {
          bidding: options.bidding,
        },
      });
    }
    // 3. handleTask
    res = await this._flowData_task_checkRight(
      this.localRight.complete({
        flowTask,
        user,
        handle: null,
        getOptions: async () => {
          return await nodeInstances.getOptions(task.flowNodeId);
        },
        disableCheckTimeClaimed: true,
      }),
    );
    if (res) {
      const options = await nodeInstances.getOptions(task.flowNodeId);
      actions.push({
        name: 'handleTask',
        options: {
          allowPassTask: options.allowPassTask,
          allowRejectTask: options.allowRejectTask,
        },
      });
    }
    // 4. cancelFlow
    res = await this._flowData_task_checkRight(
      this.localRight.cancelFlow({
        flowTask,
        user,
        getOptions: async () => {
          return await nodeInstances.getOptions(task.flowNodeId);
        },
        disableCheckTimeClaimed: true,
      }),
    );
    if (res) {
      actions.push({
        name: 'cancelFlow',
      });
    }
    // 5. viewAtom
    actions.push({
      name: 'viewAtom',
    });
    // 6. appendHandleRemark
    res = await this._flowData_task_checkRight(
      this.localRight.appendHandleRemark({ flowTask, user, flowNodeType: task.flowNodeType }),
    );
    if (res) {
      actions.push({
        name: 'appendHandleRemark',
      });
    }
    // 7.1 allowForward: forward
    res = await this._flowData_task_checkRight(
      this.localRight.forward({
        flowTask,
        user,
        getOptions: async () => {
          return await nodeInstances.getOptions(task.flowNodeId);
        },
        disableCheckTimeClaimed: true,
      }),
    );
    if (res) {
      actions.push({
        name: 'forward',
      });
    }
    // 7.2 allowForward: forwardRecall
    res = await this._flowData_task_checkRight(
      this.localRight.forwardRecall({
        flowTask,
        user,
        getOptions: async () => {
          return await nodeInstances.getOptions(task.flowNodeId);
        },
        getTask: flowTaskIdForwardTo => {
          return tasks.find(item => item.flowTaskId === flowTaskIdForwardTo);
        },
      }),
    );
    if (res) {
      actions.push({
        name: 'forwardRecall',
      });
    }
    // 8.1 allowSubstitute: substitute
    res = await this._flowData_task_checkRight(
      this.localRight.substitute({
        flowTask,
        user,
        getOptions: async () => {
          return await nodeInstances.getOptions(task.flowNodeId);
        },
        disableCheckTimeClaimed: true,
      }),
    );
    if (res) {
      actions.push({
        name: 'substitute',
      });
    }
    // 8.2 allowSubstitute: substituteRecall
    res = await this._flowData_task_checkRight(
      this.localRight.substituteRecall({
        flowTask,
        user,
        getOptions: async () => {
          return await nodeInstances.getOptions(task.flowNodeId);
        },
        getTask: flowTaskIdSubstituteTo => {
          return tasks.find(item => item.flowTaskId === flowTaskIdSubstituteTo);
        },
      }),
    );
    if (res) {
      actions.push({
        name: 'substituteRecall',
      });
    }
    // ok
    return actions;
  }
}
