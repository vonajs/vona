import { BeanBase, Controller } from 'vona';
import { ScopeModule } from '../.metadata/this.js';

@Controller()
export class ControllerCategory extends BeanBase<ScopeModule> {
  async child() {
    const atomClass = this.ctx.request.body.atomClass;
    const res = await this.scope.service.category.child({
      atomClass,
      language: this.ctx.request.body.language,
      categoryId: this.ctx.request.body.categoryId,
      categoryName: this.ctx.request.body.categoryName,
      categoryHidden: this.ctx.request.body.categoryHidden,
      categoryFlag: this.ctx.request.body.categoryFlag,
      setLocale: this.ctx.request.body.setLocale,
      user: this.ctx.state.user.op,
    });
    this.app.success(res);
  }

  async children() {
    const atomClass = this.ctx.request.body.atomClass;
    const list = await this.scope.service.category.children({
      atomClass,
      language: this.ctx.request.body.language,
      categoryId: this.ctx.request.body.categoryId,
      categoryName: this.ctx.request.body.categoryName,
      categoryHidden: this.ctx.request.body.categoryHidden,
      categoryFlag: this.ctx.request.body.categoryFlag,
      setLocale: this.ctx.request.body.setLocale,
      user: this.ctx.state.user.op,
    });
    this.app.success({ list });
  }

  async tree() {
    const atomClass = this.ctx.request.body.atomClass;
    const list = await this.scope.service.category.tree({
      atomClass,
      language: this.ctx.request.body.language,
      categoryId: this.ctx.request.body.categoryId,
      categoryHidden: this.ctx.request.body.categoryHidden,
      categoryFlag: this.ctx.request.body.categoryFlag,
      setLocale: this.ctx.request.body.setLocale,
      user: this.ctx.state.user.op,
    });
    this.app.success({ list });
  }

  async add() {
    // check demo
    this.app.bean.util.checkDemo();
    const atomClass = this.ctx.request.body.atomClass;
    const res = await this.scope.service.category.add({
      atomClass,
      data: this.ctx.request.body.data,
    });
    this.app.success(res);
  }

  async delete() {
    // check demo
    this.app.bean.util.checkDemo();
    // need not param:atomClass
    const res = await this.scope.service.category.delete({
      categoryId: this.ctx.request.body.categoryId,
    });
    this.app.success(res);
  }

  async move() {
    // check demo
    this.app.bean.util.checkDemo();
    // need not param:atomClass
    const res = await this.scope.service.category.move({
      categoryId: this.ctx.request.body.categoryId,
      categoryIdParent: this.ctx.request.body.categoryIdParent,
    });
    this.app.success(res);
  }

  async item() {
    // need not param:atomClass
    const data = await this.scope.service.category.item({
      categoryId: this.ctx.request.body.categoryId,
      setLocale: this.ctx.request.body.setLocale,
    });
    this.app.success(data);
  }

  async save() {
    // check demo
    this.app.bean.util.checkDemo();
    // need not param:atomClass
    const res = await this.scope.service.category.save({
      categoryId: this.ctx.request.body.categoryId,
      data: this.ctx.request.body.data,
    });
    this.app.success(res);
  }

  async relativeTop() {
    // need not param:atomClass
    const res = await this.scope.service.category.relativeTop({
      categoryId: this.ctx.request.body.categoryId,
      setLocale: this.ctx.request.body.setLocale,
    });
    this.app.success(res);
  }

  async parseCategoryName() {
    const atomClass = this.ctx.request.body.atomClass;
    const category = await this.scope.service.category.parseCategoryName({
      atomClass,
      language: this.ctx.request.body.language,
      categoryName: this.ctx.request.body.categoryName,
      categoryIdParent: this.ctx.request.body.categoryIdParent,
      force: false,
    });
    this.app.success(category);
  }
}
