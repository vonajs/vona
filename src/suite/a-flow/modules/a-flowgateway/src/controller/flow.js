module.exports = class FlowController {
  async start() {
    // start
    const flowInstance = await this.ctx.bean.flow.startByKey({
      flowDefKey: this.ctx.request.body.flowDefKey,
      flowVars: this.ctx.request.body.flowVars,
      flowUserId: this.ctx.state.user.op.id,
    });
    this.ctx.success({
      flowId: flowInstance.context._flowId,
    });
  }
};
