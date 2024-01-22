module.exports = class Queue {
  async execute(context) {
    const { path, options, message, messageSyncs, messageClass } = context.data;
    return await this.ctx.bean.local.ioInner.queueDelivery({ path, options, message, messageSyncs, messageClass });
  }
};
