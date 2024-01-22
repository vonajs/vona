const moduleInfo = module.info;
module.exports = class Queue {
  async execute(context) {
    const { mode } = context.data;
    const flowNodeType = mode === 'parallel' ? 'gatewayParallel' : 'gatewayInclusive';
    const _nodeBean = this.ctx.bean._newBean(`${moduleInfo.relativeName}.flow.node.${flowNodeType}`);
    await _nodeBean._runCheck(context);
  }
};
