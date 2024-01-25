import BeanFlowTaskFlowData from './bean.flowTask_flowData.js';

export class BeanFlowTaskNodeDoneCheck extends BeanFlowTaskFlowData {
  async _nodeDoneCheckLock({ flowNodeId }) {
    // load flow node
    let nodeInstance;
    try {
      nodeInstance = await this.ctx.bean.flow._loadFlowNodeInstance({ flowNodeId });
    } catch (err) {}
    if (!nodeInstance) {
      // here means done
      return;
    }
    // options
    const options = this._getNodeDefOptionsTask({ nodeInstance });
    // completionCondition
    const completionCondition = options.completionCondition;
    // task count
    const taskCountTotal = await this.modelFlowTask.count({
      flowNodeId,
      ignoreMark: 0,
    });
    if (taskCountTotal === 0) {
      // means node has been checked and done
      // XX //   should throw error to deny the db changed for tasks has been deleted.
      // XX this.ctx.throw.module('a-flow', 1004, flowNodeId);
      // neednot throw error for this method is called in this.ctx.tail
      return;
    }
    const taskCountPassed = await this.modelFlowTask.count({
      flowNodeId,
      flowTaskStatus: 1,
      handleStatus: 1,
      ignoreMark: 0,
    });
    const taskCountRejected = await this.modelFlowTask.count({
      flowNodeId,
      flowTaskStatus: 1,
      handleStatus: 2,
      ignoreMark: 0,
    });
    // check passed
    if (typeof completionCondition.passed === 'number' || completionCondition.passed.indexOf('%') === -1) {
      // absolute value
      if (taskCountPassed >= parseInt(completionCondition.passed)) {
        return await this._nodeDoneCheckLock_passed({ nodeInstance, options });
      }
    } else {
      // percent value
      if (taskCountPassed / taskCountTotal >= parseInt(completionCondition.passed) / 100) {
        return await this._nodeDoneCheckLock_passed({ nodeInstance, options });
      }
    }
    // check rejected
    if (typeof completionCondition.rejected === 'number' || completionCondition.rejected.indexOf('%') === -1) {
      // absolute value
      if (taskCountRejected >= parseInt(completionCondition.rejected)) {
        return await this._nodeDoneCheckLock_rejected({ nodeInstance, options });
      }
    } else {
      // percent value
      if (taskCountRejected / taskCountTotal >= parseInt(completionCondition.rejected) / 100) {
        return await this._nodeDoneCheckLock_rejected({ nodeInstance, options });
      }
    }
    // here means not done
  }

  async _nodeDoneCheckLock_passed({ nodeInstance, options }) {
    // next stage of flow node: end
    return await nodeInstance.end();
  }

  async _nodeDoneCheckLock_rejected({ nodeInstance, options }) {
    // rejectedNode
    return await this._gotoFlowNodePrevious({ nodeInstance, rejectedNode: options.rejectedNode });
  }

  async _gotoFlowNodePrevious({ nodeInstance, rejectedNode, flowNodeRemark = 'Rejected' }) {
    // flowNodeId
    const flowNodeId = nodeInstance.contextNode._flowNodeId;
    // rejectedNode
    if (!rejectedNode) {
      // find previous task node
      const flowNode = await this._findFlowNodeHistoryPrevious({ nodeInstance });
      if (!flowNode) this.ctx.throw.module('a-flow', 1006, flowNodeId);
      rejectedNode = flowNode.flowNodeDefId;
    }
    // nodeInstancePrev
    const nodeInstancePrev = await nodeInstance.flowInstance._findNodeInstanceNext({
      nodeDefId: rejectedNode,
      flowNodeIdPrev: flowNodeId,
    });
    // clear & enter
    await nodeInstance.clear({ flowNodeHandleStatus: 2, flowNodeRemark });
    return await nodeInstancePrev.enter();
  }

  async _findFlowNodeHistoryPrevious({ nodeInstance }) {
    return await nodeInstance._findFlowNodeHistoryPrevious();
  }
}
