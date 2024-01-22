module.exports = class Flow {
  async data({ flowId, options, user }) {
    return await this.ctx.bean.flowTask.flowData({ flowId, options, user });
  }
};
