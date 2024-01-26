import { Bean, BeanBase } from '@cabloy/core';

@Bean({ scene: 'flow.node' })
export class FlowNodeEndEventNone extends BeanBase {
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
