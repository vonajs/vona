import { ScopeModule } from '../../resource/this.js';
import { BeanBase } from '@cabloy/core';

export class BeanFlow0 extends BeanBase<ScopeModule> {
  get modelFlow() {
    return this.scope.model.flow;
  }
  get modelFlowHistory() {
    return this.scope.model.flowHistory;
  }
  get modelFlowNode() {
    return this.scope.model.flowNode;
  }
  get modelFlowNodeHistory() {
    return this.scope.model.flowNodeHistory;
  }

  get sqlProcedure() {
    return this.scope.local.procedure;
  }
}
