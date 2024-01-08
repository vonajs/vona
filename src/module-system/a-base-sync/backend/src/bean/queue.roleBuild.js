module.exports = class Queue {
  async execute(context) {
    const { options } = context.data;
    await this.ctx.bean.role._buildQueue(options);
  }
};
