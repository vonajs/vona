import { Bean } from '@cabloy/core';
import { BeanFlowNodeBase } from 'cabloy-module-api-a-flow';

@Bean({ scene: 'flow.node' })
export class FlowNodeEndEventNone extends BeanFlowNodeBase {
  async onNodeLeave() {
    await super.onNodeLeave();
    // end
    await this.flowInstance._endFlow({
      flowHandleStatus: 1,
      flowRemark: null,
      // should not handle atom
      // atom: {
      //   close: true,
      // },
    });
    // also true
    return true;
  }
}
