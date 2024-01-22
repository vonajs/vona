module.exports = class Broadcast {
  async execute(context) {
    const data = context.data;
    this.ctx.bean.io.broadcastSocketEmit(data);
  }
};
