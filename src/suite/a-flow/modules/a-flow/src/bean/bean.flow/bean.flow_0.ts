import { BeanBase, cast } from 'vona';
import { BeanFlow } from '../bean.flow.js';

export class BeanFlow0 extends BeanBase {
  get self() {
    return cast<BeanFlow>(this);
  }

  get modelFlow() {
    return this.self.scope.model.flow;
  }
  get modelFlowHistory() {
    return this.self.scope.model.flowHistory;
  }
  get modelFlowNode() {
    return this.self.scope.model.flowNode;
  }
  get modelFlowNodeHistory() {
    return this.self.scope.model.flowNodeHistory;
  }

  get sqlProcedure() {
    return this.self.scope.service.procedure;
  }
}
