import { BeanBase, cast } from 'vona';
import { LocalContextTask } from '../../common/local.context.task.js';
import { ServiceLocalFlowTask } from '../localFlowTask.js';

export class LocalFlowTask0 extends BeanBase {
  nodeInstance: any;
  flowInstance: any;
  context: any;
  contextNode: any;
  contextTask: any;

  get self() {
    return cast<ServiceLocalFlowTask>(this);
  }

  protected __init__({ nodeInstance }: any) {
    this.nodeInstance = nodeInstance;
    this.flowInstance = nodeInstance.flowInstance;
    this.context = nodeInstance.context;
    this.contextNode = nodeInstance.contextNode;
    // context
    this.contextTask = this.app.bean._newBean(LocalContextTask, {
      context: nodeInstance.context,
      contextNode: nodeInstance.contextNode,
      nodeDef: nodeInstance.contextNode._nodeDef,
    });
  }

  get modelFlowTask() {
    return this.self.scope.model.flowTask;
  }
  get modelFlowTaskHistory() {
    return this.self.scope.model.flowTaskHistory;
  }
  get localRight() {
    return this.self.scope.service.right;
  }
}
