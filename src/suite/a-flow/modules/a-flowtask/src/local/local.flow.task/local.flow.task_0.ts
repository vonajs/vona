import { ScopeModule } from '../../resource/this.js';
import { BeanBase } from '@cabloy/core';
import { LocalContextTask } from '../local.context.task.js';

export class LocalFlowTask0 extends BeanBase<ScopeModule> {
  nodeInstance: any;
  flowInstance: any;
  context: any;
  contextNode: any;
  contextTask: any;

  constructor({ nodeInstance }: any) {
    super();
    this.nodeInstance = nodeInstance;
    this.flowInstance = nodeInstance.flowInstance;
    this.context = nodeInstance.context;
    this.contextNode = nodeInstance.contextNode;
  }

  __init__({ nodeInstance }: any) {
    // context
    this.contextTask = this.ctx.bean._newBean(LocalContextTask, {
      context: nodeInstance.context,
      contextNode: nodeInstance.contextNode,
      nodeDef: nodeInstance.contextNode._nodeDef,
    });
  }

  get modelFlowTask() {
    return this.scope.model.flowTask;
  }
  get modelFlowTaskHistory() {
    return this.scope.model.flowTaskHistory;
  }
  get localRight() {
    return this.scope.local.right;
  }
}
