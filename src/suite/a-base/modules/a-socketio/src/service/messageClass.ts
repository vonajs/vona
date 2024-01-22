module.exports = class MessageClass {
  async messageClass({ messageClass }) {
    return await this.ctx.bean.io.messageClass.get(messageClass);
  }
};
