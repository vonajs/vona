import { BeanTemp } from 'vona-module-a-bean';

import { BeanFlowServiceBase } from 'vona-module-a-flownode';

@BeanTemp({ scene: 'flow.service' })
export class FlowServiceStartEventTimer extends BeanFlowServiceBase {
  async execute(context) {
    // parameter
    const { flowDefId, parameter, node } = context.parameter;
    // start
    await this.app.bean.flow.startById({
      flowDefId,
      flowVars: parameter,
      flowUserId: 1,
      startEventId: node.id,
    });
  }
}
