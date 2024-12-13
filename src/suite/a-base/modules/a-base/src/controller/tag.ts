import { BeanBase } from 'vona';
import { Controller } from 'vona-module-a-web';

@Controller()
export class ControllerTag extends BeanBase {
  async list() {
    const atomClass = this.ctx.request.body.atomClass;
    const list = await this.scope.service.tag.list({
      atomClass,
      options: this.ctx.request.body.options,
    });
    this.app.success({ list });
  }

  async add() {
    // check demo
    this.app.bean.util.checkDemo();
    const atomClass = this.ctx.request.body.atomClass;
    const res = await this.scope.service.tag.add({
      atomClass,
      data: this.ctx.request.body.data,
    });
    this.app.success(res);
  }

  async save() {
    // check demo
    this.app.bean.util.checkDemo();
    // need not param:atomClass
    const res = await this.scope.service.tag.save({
      tagId: this.ctx.request.body.tagId,
      data: this.ctx.request.body.data,
    });
    this.app.success(res);
  }

  async delete() {
    // check demo
    this.app.bean.util.checkDemo();
    // need not param:atomClass
    const res = await this.scope.service.tag.delete({
      tagId: this.ctx.request.body.tagId,
    });
    this.app.success(res);
  }
}
