module.exports = class FlowController {
  async data() {
    const res = await this.ctx.service.flow.data({
      flowId: this.ctx.request.body.flowId,
      options: this.ctx.request.body.options,
      user: this.ctx.state.user.op,
    });
    this.ctx.success(res);
  }
};
