import { Bean } from 'vona';
import { BeanFlowNodeBase } from 'vona-module-a-flow';

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
