import { __ThisModule__ } from '../../resource/this.js';
import { BeanBase } from '@cabloy/core';

export class LocalFlowTask0 extends BeanBase {
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
    this.contextTask = this.ctx.bean._newBean(`${__ThisModule__}.local.context.task`, {
      context: nodeInstance.context,
      contextNode: nodeInstance.contextNode,
      nodeDef: nodeInstance.contextNode._nodeDef,
    });
  }

  get modelFlowTask() {
    return this.ctx.model.module(__ThisModule__).flowTask;
  }
  get modelFlowTaskHistory() {
    return this.ctx.model.module(__ThisModule__).flowTaskHistory;
  }
  get localRight() {
    return this.ctx.bean._getBean('a-flowtask.local.right');
  }
}
