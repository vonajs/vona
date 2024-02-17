import { BeanFlowAssignees } from './bean.flow_assignees.js';

export class BeanFlowLoad extends BeanFlowAssignees {
  async _loadFlowInstance({ flowId, history, throwError = true }: any) {
    // flow
    let flow;
    if (!history) {
      flow = await this.modelFlow.get({ id: flowId });
    } else {
      flow = await this.modelFlowHistory.get({ flowId });
      if (flow) {
        flow.id = flowId;
      }
    }
    if (!flow) {
      if (throwError) {
        this.scope.error.FlowNotFound__.throw(flowId);
      } else {
        return null;
      }
    }
    // flowDef: by key+revision
    const flowDef = await this.ctx.bean.flowDef.getByKeyAndRevision({
      flowDefKey: flow.flowDefKey,
      flowDefRevision: flow.flowDefRevision,
    });
    if (!flowDef) this.scope.error.FlowDefinitionNotFound__.throw(flow.flowDefId);
    // not check atomDisabled
    // flowInstance
    const flowInstance = this.self._createFlowInstance({ flowDef });
    // load
    await flowInstance._load({ flow, history });
    // ok
    return flowInstance;
  }

  async _loadFlowNodeInstance({ flowNodeId, history, throwError = true }: any) {
    // get
    let flowNode;
    if (!history) {
      flowNode = await this.modelFlowNode.get({ id: flowNodeId });
    } else {
      flowNode = await this.modelFlowNodeHistory.get({ flowNodeId });
      if (flowNode) {
        flowNode.id = flowNodeId;
      }
    }
    if (!flowNode) {
      if (throwError) {
        this.scope.error.FlowNodeNotFound__.throw(flowNodeId);
      } else {
        return null;
      }
    }
    // load flow
    const flowInstance = await this._loadFlowInstance({ flowId: flowNode.flowId, history });
    // load flow node
    const flowNodeInstance = await flowInstance!._loadNodeInstance({ flowNode, history });
    return flowNodeInstance;
  }
}
