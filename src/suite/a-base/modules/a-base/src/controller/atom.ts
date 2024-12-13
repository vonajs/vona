import { BeanBase } from 'vona';
import { Controller } from 'vona-module-a-web';

@Controller()
export class ControllerAtom extends BeanBase {
  async preferredRoles() {
    const res = await this.scope.service.atom.preferredRoles({
      atomClass: this.ctx.request.body.atomClass,
      user: this.ctx.state.user.op,
    });
    this.app.success(res);
  }

  async preferredRole() {
    const res = await this.scope.service.atom.preferredRole({
      atomClass: this.ctx.request.body.atomClass,
      user: this.ctx.state.user.op,
    });
    this.app.success(res);
  }

  async preferredRoleId() {
    const res = await this.scope.service.atom.preferredRoleId({
      atomClass: this.ctx.request.body.atomClass,
      user: this.ctx.state.user.op,
    });
    this.app.success(res);
  }

  async default() {
    // prepare options/item same as create action
    // options
    const options = this.ctx.request.body.options;
    // item
    const item = this._prepareItemForCreate();
    // create
    const res = await this.scope.service.atom.default({
      atomClass: this.ctx.request.body.atomClass,
      roleIdOwner: this.ctx.request.body.roleIdOwner,
      item,
      options,
      user: this.ctx.state.user.op,
    });
    this.app.success(res);
  }

  async create() {
    // options
    const options = this.ctx.request.body.options;
    // item
    const item = this._prepareItemForCreate();
    // create
    const res = await this.scope.service.atom.create({
      atomClass: this.ctx.request.body.atomClass,
      roleIdOwner: this.ctx.request.body.roleIdOwner,
      item,
      options,
      user: this.ctx.state.user.op,
    });
    this.app.success(res);
  }

  async atomClass() {
    const res = await this.scope.service.atom.atomClass({
      key: this.ctx.request.body.key,
      user: this.ctx.state.user.op,
    });
    this.app.success(res);
  }

  async read() {
    const res = await this.scope.service.atom.read({
      key: this.ctx.request.body.key,
      atomClass: this.ctx.request.body.atomClass,
      options: this.ctx.request.body.options,
      user: this.ctx.state.user.op,
    });
    this.app.success(res);
  }

  // options
  //   where, orders, page, star, label
  async select() {
    const options = this.ctx.request.body.options;
    options.page = this.app.bean.util.page(options.page);
    const items = await this.scope.service.atom.select({
      atomClass: this.ctx.request.body.atomClass,
      options,
      user: this.ctx.state.user.op,
    });
    this.app.successMore(items, options.page.index, options.page.size);
  }

  async count() {
    const options = this.ctx.request.body.options;
    const count = await this.scope.service.atom.count({
      atomClass: this.ctx.request.body.atomClass,
      options,
      user: this.ctx.state.user.op,
    });
    this.app.success(count);
  }

  async write() {
    // options
    const options = this.ctx.request.body.options;
    const saveDraftOnly = options?.saveDraftOnly;
    Object.assign(options, {
      ignoreValidate: false,
      saveDraftOnly,
      ignoreNotEmpty: saveDraftOnly,
    });
    // key
    const key = this.ctx.request.body.key;
    // item
    let item;
    if (key.atomId === 0) {
      // create delay
      item = this._prepareItemForCreate();
    } else {
      item = this.ctx.request.body.item;
    }
    // write
    const res = await this.scope.service.atom.write({
      key,
      atomClass: this.ctx.request.body.atomClass,
      roleIdOwner: this.ctx.request.body.roleIdOwner,
      item,
      user: this.ctx.state.user.op,
      options,
    });
    // return value: same as create
    this.app.success(res);
  }

  async openDraft() {
    const res = await this.scope.service.atom.openDraft({
      key: this.ctx.request.body.key,
      atomClass: this.ctx.request.body.atomClass,
      user: this.ctx.state.user.op,
    });
    this.app.success(res);
  }

  async submit() {
    const options = this.ctx.request.body.options;
    // submit
    const res = await this.scope.service.atom.submit({
      key: this.ctx.request.body.key,
      options,
      user: this.ctx.state.user.op,
    });
    this.app.success(res);
  }

  async delete() {
    await this.scope.service.atom.delete({
      key: this.ctx.request.body.key,
      atomClass: this.ctx.request.body.atomClass,
      options: this.ctx.request.body.options,
      user: this.ctx.state.user.op,
    });
    this.app.success();
  }

  async deleteBulk() {
    const res = await this.scope.service.atom.deleteBulk({
      atomClass: this.ctx.request.body.atomClass,
      keys: this.ctx.request.body.keys,
      options: this.ctx.request.body.options,
      user: this.ctx.state.user.op,
    });
    this.app.success(res);
  }

  async clone() {
    const res = await this.scope.service.atom.clone({
      key: this.ctx.request.body.key,
      atomClass: this.ctx.request.body.atomClass,
      roleIdOwner: this.ctx.request.body.roleIdOwner,
      options: this.ctx.request.body.options,
      user: this.ctx.state.user.op,
    });
    this.app.success(res);
  }

  async enable() {
    const res = await this.scope.service.atom.enable({
      key: this.ctx.request.body.key,
      user: this.ctx.state.user.op,
    });
    this.app.success(res);
  }

  async disable() {
    const res = await this.scope.service.atom.disable({
      key: this.ctx.request.body.key,
      user: this.ctx.state.user.op,
    });
    this.app.success(res);
  }

  async exportBulk() {
    const res = await this.scope.service.atom.exportBulk({
      atomClass: this.ctx.request.body.atomClass,
      options: this.ctx.request.body.options,
      fields: this.ctx.request.body.fields,
      user: this.ctx.state.user.op,
    });
    this.app.success(res);
  }

  async importBulk() {
    const res = await this.scope.service.atom.importBulk({
      atomClass: this.ctx.request.body.atomClass,
      options: this.ctx.request.body.options,
      file: this.ctx.request.body.file,
      user: this.ctx.state.user.op,
    });
    this.app.success(res);
  }

  async performAction() {
    const res = await this.scope.service.atom.performAction({
      key: this.ctx.request.body.key,
      atomClass: this.ctx.request.body.atomClass,
      action: this.ctx.request.body.action,
      item: this.ctx.request.body.item,
      options: this.ctx.request.body.options,
      user: this.ctx.state.user.op,
    });
    this.app.success(res);
  }

  async performActionBulk() {
    const res = await this.scope.service.atom.performActionBulk({
      keys: this.ctx.request.body.keys,
      atomClass: this.ctx.request.body.atomClass,
      action: this.ctx.request.body.action,
      item: this.ctx.request.body.item,
      options: this.ctx.request.body.options,
      user: this.ctx.state.user.op,
    });
    this.app.success(res);
  }

  async star() {
    const res = await this.scope.service.atom.star({
      key: this.ctx.request.body.key,
      atom: this.ctx.request.body.atom,
      user: this.ctx.state.user.op,
    });
    this.app.success(res);
  }

  async readCount() {
    const res = await this.scope.service.atom.readCount({
      key: this.ctx.request.body.key,
      atom: this.ctx.request.body.atom,
      user: this.ctx.state.user.op,
    });
    this.app.success(res);
  }

  async stats() {
    const res = await this.scope.service.atom.stats({
      atomIds: this.ctx.request.body.atomIds,
      user: this.ctx.state.user.op,
    });
    this.app.success(res);
  }

  async labels() {
    const res = await this.scope.service.atom.labels({
      key: this.ctx.request.body.key,
      atom: this.ctx.request.body.atom,
      user: this.ctx.state.user.op,
    });
    this.app.success(res);
  }

  async actions() {
    const res = await this.scope.service.atom.actions({
      key: this.ctx.request.body.key,
      atomClass: this.ctx.request.body.atomClass,
      options: this.ctx.request.body.options,
      basic: this.ctx.request.body.basic,
      user: this.ctx.state.user.op,
    });
    this.app.success(res);
  }

  async actionsBulk() {
    const res = await this.scope.service.atom.actionsBulk({
      atomClass: this.ctx.request.body.atomClass,
      options: this.ctx.request.body.options,
      user: this.ctx.state.user.op,
    });
    this.app.success(res);
  }

  async checkRightAction() {
    const res = await this.scope.service.atom.checkRightAction({
      key: this.ctx.request.body.key,
      atomClass: this.ctx.request.body.atomClass,
      action: this.ctx.request.body.action,
      stage: this.ctx.request.body.stage,
      user: this.ctx.state.user.op,
      checkFlow: this.ctx.request.body.checkFlow,
    });
    this.app.success(res);
  }

  async schema() {
    const res = await this.scope.service.atom.schema({
      atomClass: this.ctx.request.body.atomClass,
      schema: this.ctx.request.body.schema,
    });
    this.app.success(res);
  }

  async validator() {
    const res = await this.scope.service.atom.validator({
      atomClass: this.ctx.request.body.atomClass,
    });
    this.app.success(res);
  }

  async moveUp() {
    const res = await this.scope.service.atom.moveUp({
      key: this.ctx.request.body.key,
      atomClass: this.ctx.request.body.atomClass,
      options: this.ctx.request.body.options,
      user: this.ctx.state.user.op,
    });
    this.app.success(res);
  }

  async moveDown() {
    const res = await this.scope.service.atom.moveDown({
      key: this.ctx.request.body.key,
      atomClass: this.ctx.request.body.atomClass,
      options: this.ctx.request.body.options,
      user: this.ctx.state.user.op,
    });
    this.app.success(res);
  }

  _prepareItemForCreate() {
    // item
    const item = this.ctx.request.body.item || {};
    // for safe
    delete item.atomId;
    delete item.itemId;
    delete item.atomStatic;
    delete item.atomStaticKey;
    delete item.atomRevision;
    return item;
  }
}
