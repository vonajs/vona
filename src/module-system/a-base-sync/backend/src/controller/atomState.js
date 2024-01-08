module.exports = class AtomStateController {
  async getDictDynamic() {
    const res = await this.ctx.service.atomState.getDictDynamic({
      atomClass: this.ctx.request.body.atomClass,
    });
    this.ctx.success(res);
  }
};
