import { cast, Queue } from 'vona';
import { BeanQueueBase, IQueueExecute, IQueuePushOptions } from 'vona-module-a-queue';
import { __ThisModule__, ScopeModule } from '../.metadata/this.js';
import { TypeGatewayMode } from '../types.js';

export type TypeQueueGatewayJobData = {
  gatewayMode: TypeGatewayMode;
  flowId: number;
  flowNodeId: number;
  nodeDefId: number;
  edgeDefId: number;
  behaviorDefId: number;
};

export type TypeQueueGatewayJobResult = void;

@Queue({
  options: {
    worker: {
      concurrency: 10,
    },
  },
})
export class QueueGateway
  extends BeanQueueBase<ScopeModule, TypeQueueGatewayJobData, TypeQueueGatewayJobResult>
  implements IQueueExecute<TypeQueueGatewayJobData, TypeQueueGatewayJobResult>
{
  async execute(data: TypeQueueGatewayJobData, _options?: IQueuePushOptions): Promise<TypeQueueGatewayJobResult> {
    const { gatewayMode } = data;
    const flowNodeType = gatewayMode === 'parallel' ? 'gatewayParallel' : 'gatewayInclusive';
    const _nodeBean = this.app.bean._newBean(`${__ThisModule__}.flow.node.${flowNodeType}`);
    await cast(_nodeBean)._runCheck(data);
  }
}
