import { __ThisModule__ } from '../resource/this.js';
import { BeanFlowNodeBase } from 'cabloy-module-api-a-flow';

export class FlowNodeGatewayBase extends BeanFlowNodeBase {
  gatewayMode: 'exclusive' | 'inclusive' | 'parallel';

  constructor(gatewayMode) {
    super();
    this.gatewayMode = gatewayMode;
  }

  async onNodeEnter() {
    // super
    const res = await super.onNodeEnter();
    if (!res) return res;
    // push
    const flowId = this.context._flowId;
    const flowNodeId = this.contextNode._flowNodeId;
    const nodeDefId = this.contextNode._nodeDef.id;
    const edgeDefId = this.contextEdge._edgeDef.id;
    const behaviorDefId = this.contextEdge._edgeDef.behavior;
    const data = {
      gatewayMode: this.gatewayMode,
      flowId,
      flowNodeId,
      nodeDefId,
      edgeDefId,
      behaviorDefId,
    };
    // jump out of the transaction
    this.ctx.tail(async () => {
      await this.ctx.meta.util.queuePushAsync({
        module: __ThisModule__,
        queueName: 'gateway',
        queueNameSub: `${flowId}:${nodeDefId}:${behaviorDefId || ''}`,
        data,
      });
    });
    // break
    return false;
  }

  async _runCheck(context) {
    const { flowId, flowNodeId, nodeDefId, edgeDefId, behaviorDefId } = context.data;
    const debug = this.ctx.app.bean.debug.get('flow');
    debug(
      'gateway %s: flowId:%d, flowNodeId:%d, nodeDefId:%s, edgeDefId:%s',
      this.gatewayMode,
      flowId,
      flowNodeId,
      nodeDefId,
      edgeDefId,
    );
    // node
    const nodeInstance = await this.ctx.bean.flow._loadFlowNodeInstance({ flowNodeId, throwError: false });
    if (!nodeInstance) {
      // do nothing
      //   1. maybe invoked again by mq queue, specailly in the debug environment
      //   2. the shadow nodes which has bean deleted
      return;
    }
    // check if has shadow node instance
    const nodeInstanceShadow = await this._checkShadowNodeBefore({ nodeInstance, behaviorDefId });
    if (nodeInstanceShadow) {
      // exists
      //   clear the current node
      await nodeInstance.clear({ flowNodeHandleStatus: 3 });
      //   delete history
      await nodeInstance.modelFlowNodeHistory.delete({ flowNodeId });
    }
    // check done
    const nodeInstanceCurrent = nodeInstanceShadow || nodeInstance;
    const done = await this._checkDone({ nodeInstanceCurrent });
    debug('gateway %s: flowId:%d, flowNodeId:%d, done:%d', this.gatewayMode, flowId, flowNodeId, done);
    if (done) {
      // clear the other shadow nodes
      const nodeInstancesShadow = await this._checkShadowNodesOthers({
        nodeInstance: nodeInstanceCurrent,
        behaviorDefId,
      });
      for (const nodeInstanceShadow of nodeInstancesShadow) {
        //   clear the shadow node
        await nodeInstanceShadow.clear({ flowNodeHandleStatus: 3 });
        //   delete history
        await nodeInstanceShadow.modelFlowNodeHistory.delete({
          flowNodeId: nodeInstanceShadow.contextNode._flowNodeId,
        });
      }
      // continue
      await nodeInstanceCurrent.begin();
    }
  }

  async _checkShadowNodeBefore({ nodeInstance, behaviorDefId }: any) {
    const flowNodeId = nodeInstance.contextNode._flowNodeId;
    const flowNodeDefId = nodeInstance.contextNode._nodeDef.id;
    const flowNodeShadow = await nodeInstance.modelFlowNode.get({
      flowNodeDefId,
      behaviorDefId: behaviorDefId || '',
      id: { op: '<', val: flowNodeId },
    });
    if (!flowNodeShadow) return null;
    return await this.ctx.bean.flow._loadFlowNodeInstance({ flowNodeId: flowNodeShadow.id });
  }

  async _checkShadowNodesOthers({ nodeInstance, behaviorDefId }: any) {
    const flowNodeId = nodeInstance.contextNode._flowNodeId;
    const flowNodeDefId = nodeInstance.contextNode._nodeDef.id;
    const flowNodesShadow = await nodeInstance.modelFlowNode.select({
      where: {
        flowNodeDefId,
        behaviorDefId: behaviorDefId || '',
        id: { op: '<>', val: flowNodeId },
      },
    });
    const flowNodeInstances: any[] = [];
    for (const flowNodeShadow of flowNodesShadow) {
      const flowNodeInstance = await this.ctx.bean.flow._loadFlowNodeInstance({ flowNodeId: flowNodeShadow.id });
      flowNodeInstances.push(flowNodeInstance);
    }
    return flowNodeInstances;
  }

  async _checkDone({ nodeInstanceCurrent }: any) {
    const content = nodeInstanceCurrent.context._flowDefContent;
    const flowId = nodeInstanceCurrent.context._flowId;
    const flowNodeId = nodeInstanceCurrent.contextNode._flowNodeId;
    const flowNodeDefId = nodeInstanceCurrent.contextNode._nodeDef.id;
    // all active nodes op: <>
    const flowNodesActive = await nodeInstanceCurrent.modelFlowNode.select({
      where: {
        flowId,
        flowNodeDefId: { op: '<>', val: flowNodeDefId },
        // id: { op: '<>', val: flowNodeId }, // redundant
      },
    });
    const flowNodeIdsActive = flowNodesActive.map(item => item.id);
    const debug = this.ctx.app.bean.debug.get('flow');
    debug(
      'gateway %s: flowId:%d, flowNodeId:%d, flowNodesActive:%s',
      this.gatewayMode,
      flowId,
      flowNodeId,
      flowNodeIdsActive.join(','),
    );
    if (flowNodesActive.length === 0) {
      // done
      return true;
    }
    // check if has active node which will be flowing to the gateway(out)
    for (const flowNodeActive of flowNodesActive) {
      const nodes = await this.ctx.bean.flowDef._loopNodes({
        content,
        nodeIdStart: flowNodeActive.flowNodeDefId,
        fn: async ({ nodes, node }) => {
          if (node.id === flowNodeDefId) {
            nodes.push(node);
            return false; // break
          }
        },
        options: { checkNodeStart: false },
      });
      const resMatched = nodes.length > 0;
      if (resMatched) {
        // not done
        return false;
      }
    }
    // done
    return true;
  }
}
