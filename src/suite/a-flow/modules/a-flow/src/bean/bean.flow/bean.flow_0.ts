import { ScopeModule } from '../../resource/this.js';
import { BeanBase, Cast } from 'vona';
import { BeanFlow } from '../bean.flow.js';

export class BeanFlow0 extends BeanBase<ScopeModule> {
  get self() {
    return Cast<BeanFlow>(this);
  }

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
    return this.scope.service.procedure;
  }
}
