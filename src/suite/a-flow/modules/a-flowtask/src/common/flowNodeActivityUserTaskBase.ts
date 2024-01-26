import assert from 'assert';

export default class FlowNodeActivityUserTaskBase extends module.meta.class.FlowNodeBase {
  constructor(options) {
    super(options);
    this.atomStateDefault = null;
  }

  async onNodeEnter() {
    // options
    const options = this.ctx.bean.flowTask._getNodeDefOptionsTask({
      nodeInstance: this.nodeInstance,
    });

    // atomState
    await this._setAtomState({ options });

    // super
    let res = await super.onNodeEnter();
    if (!res) return res;

    // prepare assignees
    res = await this._prepareAssignees({ options });
    if (!res) return false;

    // ok
    return true;
  }

  async onNodeBegin() {
    // super
    const res = await super.onNodeBegin();
    if (!res) return res;

    // options
    const options = this.ctx.bean.flowTask._getNodeDefOptionsTask({
      nodeInstance: this.nodeInstance,
    });

    // user
    const user = this.flowInstance._getOpUser();

    // var: _assigneesConfirmed
    const assignees = this.contextNode.vars.get('_assigneesConfirmed');
    assert(assignees && assignees.length > 0);

    // recall
    if (options.allowRecall && user.id > 0) {
      const taskInstance = await this.ctx.bean.flowTask._createTaskInstance({
        nodeInstance: this.nodeInstance,
        userIdAssignee: user.id,
        user,
      });
      await this._taskConfirmationClaim({ taskInstance, specificFlag: 2 });
    }

    // create tasks
    for (const userIdAssignee of assignees) {
      const taskInstance = await this.ctx.bean.flowTask._createTaskInstance({
        nodeInstance: this.nodeInstance,
        userIdAssignee,
        user,
      });
      if (!options.showAssignees) {
        await taskInstance._hidden({ hidden: true });
      }
    }

    // ok
    return true;
  }

  async onNodeDoing() {
    // super
    const res = await super.onNodeDoing();
    if (!res) return res;

    // break
    return false;
  }

  async onNodeClear({ options }) {
    await this.ctx.bean.flowTask._clearRemains({ nodeInstance: this.nodeInstance });
    // super
    return await super.onNodeClear({ options });
  }

  async onNodeChange({ options }) {
    const { event, taskInstance } = options;
    if (event === 'created') {
      await taskInstance.flowInstance._flowListener.onTaskCreated(taskInstance.contextTask, taskInstance.contextNode);
    } else if (event === 'claimed') {
      await taskInstance.flowInstance._flowListener.onTaskClaimed(taskInstance.contextTask, taskInstance.contextNode);
    } else if (event === 'completed') {
      await taskInstance.flowInstance._flowListener.onTaskCompleted(taskInstance.contextTask, taskInstance.contextNode);
    }
    // super
    return await super.onNodeChange({ options });
  }

  async _prepareAssignees({ options }) {
    // check var: _assigneesConfirmed
    let assignees = this.contextNode.vars.get('_assigneesConfirmed');
    if (assignees && assignees.length > 0) return true;

    // check var: _assignees
    this.contextNode.vars.get('_assignees');
    if (!assignees || assignees.length === 0) {
      // assignees
      assignees = await this.flowInstance._parseAssignees({
        nodeInstance: this.nodeInstance,
        assignees: options.assignees,
      });
    }

    // confirmation
    if (assignees.length === 0 || options.confirmation) {
      // save var: _assignees
      this.contextNode.vars.set('_assignees', assignees);
      // user
      const user = this.flowInstance._getOpUser();
      const taskInstance = await this.ctx.bean.flowTask._createTaskInstance({
        nodeInstance: this.nodeInstance,
        userIdAssignee: user.id,
        user,
      });
      await this._taskConfirmationClaim({ taskInstance, specificFlag: 1 });
      // break
      return false;
    }

    // save var: _assigneesConfirmed
    this.contextNode.vars.set('_assigneesConfirmed', assignees);

    // ok
    return true;
  }

  // specificFlag: 1,2
  async _taskConfirmationClaim({ taskInstance, specificFlag }) {
    // allowViewWorkflow
    let allowViewWorkflow;
    if (specificFlag === 1 || specificFlag === 2) {
      const nodeInstancePrevious = await this.nodeInstance._loadNodeInstancePrevious();
      const optionsPrevious = this.ctx.bean.flowTask._getNodeDefOptionsTask({
        nodeInstance: nodeInstancePrevious,
      });
      allowViewWorkflow = optionsPrevious.allowViewWorkflow;
    }
    // specificFlag timeClaimed
    const timeClaimed = new Date();
    taskInstance.contextTask._flowTask.specificFlag = specificFlag;
    if (allowViewWorkflow !== undefined) {
      taskInstance.contextTask._flowTask.allowViewWorkflow = allowViewWorkflow;
    }
    taskInstance.contextTask._flowTask.timeClaimed = timeClaimed;
    await taskInstance.modelFlowTask.update(taskInstance.contextTask._flowTask);
    // history
    taskInstance.contextTask._flowTaskHistory.specificFlag = specificFlag;
    if (allowViewWorkflow !== undefined) {
      taskInstance.contextTask._flowTaskHistory.allowViewWorkflow = allowViewWorkflow;
    }
    taskInstance.contextTask._flowTaskHistory.timeClaimed = timeClaimed;
    await taskInstance.modelFlowTaskHistory.update(taskInstance.contextTask._flowTaskHistory);
    // notify
    taskInstance._notifyTaskClaimings(taskInstance.contextTask._flowTask.userIdAssignee);
    taskInstance._notifyTaskHandlings(taskInstance.contextTask._flowTask.userIdAssignee);
  }

  async _setAtomState({ options }) {
    // static/dynamic
    let atomStateInfo = this._prepareAtomState_static({ options });
    if (!atomStateInfo) {
      atomStateInfo = await this._prepareAtomState_dynamic({ options });
    }
    // atomState
    const atomState = atomStateInfo.atomState;
    // options
    if (options.atomState !== atomState) {
      options = Object.assign({}, options, { atomState });
    }
    // set
    await this.ctx.bean.flowTask._setAtomState({ context: this.context, options });
  }

  _prepareAtomState_static({ options }) {
    const atomStage = this.context._atom.atomStage;
    const atomClass = {
      module: this.context._atom.module,
      atomClassName: this.context._atom.atomClassName,
    };
    // dictKey
    const dictKey = this.ctx.bean.atomState.static_getDictKey({ atomClass, atomStage });
    if (!dictKey) return null;
    // atomState
    let atomState;
    if (options.atomState !== undefined && options.atomState !== null) {
      atomState = options.atomState;
    } else {
      atomState = this.atomStateDefault;
    }
    return { dictKey, atomState };
  }

  async _prepareAtomState_dynamic({ options }) {
    if (this.atomStateDefault) {
      // means startEventAtom
      return { atomState: this.atomStateDefault };
    }
    const atomClass = {
      module: this.context._atom.module,
      atomClassName: this.context._atom.atomClassName,
    };
    // dictKey
    const dictKeyInfo = await this.ctx.bean.atomState.dynamic_getDictKeyInfo({ atomClass });
    const { dictKey, mode } = dictKeyInfo;
    // atomState
    let atomState;
    const code = options.atomStateTip || this.contextNode._nodeDef.name;
    if (mode === 1) {
      const flowKey = this.context._flowDef.atomStaticKey;
      atomState = `${flowKey}/${code}`;
    } else {
      atomState = code;
    }
    return { dictKey, atomState };
  }
}
