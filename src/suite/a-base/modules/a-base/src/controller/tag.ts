import { BeanBase, Controller } from 'vona';
import { ScopeModule } from '../resource/this.js';

@Controller()
export class ControllerTag extends BeanBase<ScopeModule> {
  async list() {
    const atomClass = this.ctx.request.body.atomClass;
    const list = await this.scope.service.tag.list({
      atomClass,
      options: this.ctx.request.body.options,
    });
    this.ctx.success({ list });
  }

  async add() {
    // check demo
    this.ctx.bean.util.checkDemo();
    const atomClass = this.ctx.request.body.atomClass;
    const res = await this.scope.service.tag.add({
      atomClass,
      data: this.ctx.request.body.data,
    });
    this.ctx.success(res);
  }

  async save() {
    // check demo
    this.ctx.bean.util.checkDemo();
    // need not param:atomClass
    const res = await this.scope.service.tag.save({
      tagId: this.ctx.request.body.tagId,
      data: this.ctx.request.body.data,
    });
    this.ctx.success(res);
  }

  async delete() {
    // check demo
    this.ctx.bean.util.checkDemo();
    // need not param:atomClass
    const res = await this.scope.service.tag.delete({
      tagId: this.ctx.request.body.tagId,
    });
    this.ctx.success(res);
  }
}
