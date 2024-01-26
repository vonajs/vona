import { BeanBase } from '@cabloy/core';

export class BeanFlow0 extends BeanBase {
  get modelFlow() {
    return this.ctx.model.module(__ThisModule__).flow;
  }
  get modelFlowHistory() {
    return this.ctx.model.module(__ThisModule__).flowHistory;
  }
  get modelFlowNode() {
    return this.ctx.model.module(__ThisModule__).flowNode;
  }
  get modelFlowNodeHistory() {
    return this.ctx.model.module(__ThisModule__).flowNodeHistory;
  }

  get sqlProcedure() {
    return this.ctx.bean._getBean('a-flow.local.procedure');
  }
}
