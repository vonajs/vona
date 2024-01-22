module.exports = class TagController {
  async list() {
    const atomClass = this.ctx.request.body.atomClass;
    const list = await this.ctx.service.tag.list({
      atomClass,
      options: this.ctx.request.body.options,
    });
    this.ctx.success({ list });
  }

  async add() {
    // check demo
    this.ctx.bean.util.checkDemo();
    const atomClass = this.ctx.request.body.atomClass;
    const res = await this.ctx.service.tag.add({
      atomClass,
      data: this.ctx.request.body.data,
    });
    this.ctx.success(res);
  }

  async save() {
    // check demo
    this.ctx.bean.util.checkDemo();
    // need not param:atomClass
    const res = await this.ctx.service.tag.save({
      tagId: this.ctx.request.body.tagId,
      data: this.ctx.request.body.data,
    });
    this.ctx.success(res);
  }

  async delete() {
    // check demo
    this.ctx.bean.util.checkDemo();
    // need not param:atomClass
    const res = await this.ctx.service.tag.delete({
      tagId: this.ctx.request.body.tagId,
    });
    this.ctx.success(res);
  }
};
