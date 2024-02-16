import { Bean } from '@cabloy/core';
import { BeanFlowServiceBase } from 'cabloy-module-api-a-flownode';

@Bean({ scene: 'flow.service' })
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
