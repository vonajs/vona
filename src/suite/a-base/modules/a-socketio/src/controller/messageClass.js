module.exports = class MessageClassController {
  async messageClass() {
    const res = await this.ctx.service.messageClass.messageClass({
      messageClass: this.ctx.request.body.messageClass,
    });
    this.ctx.success(res);
  }
};
