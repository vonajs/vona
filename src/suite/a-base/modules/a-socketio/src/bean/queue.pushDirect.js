module.exports = class Queue {
  async execute(context) {
    const { options, content, channel } = context.data;
    return await this.ctx.bean.local.ioInner.queuePushDirect({ options, content, channel });
  }
};
