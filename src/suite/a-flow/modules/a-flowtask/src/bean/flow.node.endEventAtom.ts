import { Bean, BeanBase } from '@cabloy/core';
import { BeanFlowNodeBase } from 'cabloy-module-api-a-flow';

@Bean({ scene: 'flow.node' })
export class FlowNodeEndEventAtom extends BeanFlowNodeBase {
  async onNodeEnter() {
    // options
    let options = this.nodeInstance.getNodeDefOptions();

    // atomState: -1
    options = Object.assign({}, options, { atomState: -1 });
    await this.ctx.bean.flowTask._setAtomState({ context: this.context, options });

    // super
    const res = await super.onNodeEnter();
    if (!res) return res;

    // ok
    return true;
  }

  async onNodeLeave() {
    await super.onNodeLeave();
    // end
    const atom = {};
    const atomStage = this.context._atom.atomStage;
    if (atomStage === 0) {
      atom.submit = true;
    } else if (atomStage === 1) {
      atom.close = true;
    }
    await this.flowInstance._endFlow({
      flowHandleStatus: 1,
      flowRemark: 'Ended',
      atom,
    });
    // also true
    return true;
  }
}
