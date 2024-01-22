module.exports = class Queue {
  async execute(context) {
    const { options, message, messageSyncs, messageClass } = context.data;
    return await this.ctx.bean.local.ioInner.queuePush({ options, message, messageSyncs, messageClass });
  }
};
