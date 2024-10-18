import { Bean } from 'vona';
import { BeanFlowServiceBase } from 'cabloy-module-api-a-flownode';

@Bean({ scene: 'flow.service' })
export class FlowServiceStartEventTimer extends BeanFlowServiceBase {
  async execute(context) {
    // parameter
    const { flowDefId, parameter, node } = context.parameter;
    // start
    await this.ctx.bean.flow.startById({
      flowDefId,
      flowVars: parameter,
      flowUserId: 1,
      startEventId: node.id,
    });
  }
}
