import { BeanTemp } from 'vona-module-a-bean';

import { BeanFlowServiceBase } from 'vona-module-a-flownode';

@BeanTemp({ scene: 'flow.service' })
export class FlowServiceTest extends BeanFlowServiceBase {
  async execute(context) {
    // parameter
    const parameter = context.parameter;
    // set var
    context.contextNode.vars.set('echo', parameter);
    // return
    return parameter;
  }
}
