const moduleInfo = module.info;
module.exports = class FlowTask {
  constructor({ nodeInstance }) {
    this.nodeInstance = nodeInstance;
    this.flowInstance = nodeInstance.flowInstance;
    this.context = nodeInstance.context;
    this.contextNode = nodeInstance.contextNode;
  }

  __init__({ nodeInstance }) {
    // context
    this.contextTask = this.ctx.bean._newBean(`${moduleInfo.relativeName}.local.context.task`, {
      context: nodeInstance.context,
      contextNode: nodeInstance.contextNode,
      nodeDef: nodeInstance.contextNode._nodeDef,
    });
  }

  get modelFlowTask() {
    return this.ctx.model.module(moduleInfo.relativeName).flowTask;
  }
  get modelFlowTaskHistory() {
    return this.ctx.model.module(moduleInfo.relativeName).flowTaskHistory;
  }
  get localRight() {
    return this.ctx.bean._getBean('a-flowtask.local.right');
  }
};
