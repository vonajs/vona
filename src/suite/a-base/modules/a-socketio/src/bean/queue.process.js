module.exports = class Queue {
  async execute(context) {
    const { path, options, message, messageClass } = context.data;
    return await this.ctx.bean.local.ioInner.queueProcess({ path, options, message, messageClass });
  }
};
