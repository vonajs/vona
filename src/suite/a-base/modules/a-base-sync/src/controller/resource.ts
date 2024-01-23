import { BeanBase, Controller, Use } from '@cabloy/core';
import { ScopeModuleABase } from '../index.js';

@Controller()
export class ControllerResource extends BeanBase {
  @Use()
  scope: ScopeModuleABase;

  // options
  //   where, orders, page, star, label, resourceType, locale
  async select() {
    const options = this.ctx.request.body.options || {};
    options.page = this.ctx.bean.util.page(options.page, false); // false
    const items = await this.scope.local.resource.select({
      atomClass: this.ctx.request.body.atomClass,
      options,
      user: this.ctx.state.user.op,
    });
    this.ctx.successMore(items, options.page.index, options.page.size);
  }

  async read() {
    const res = await this.scope.local.resource.read({
      atomStaticKey: this.ctx.request.body.atomStaticKey,
      options: this.ctx.request.body.options,
      user: this.ctx.state.user.op,
    });
    this.ctx.success(res);
  }

  async check() {
    const res = await this.scope.local.resource.check({
      atomStaticKeys: this.ctx.request.body.atomStaticKeys,
      user: this.ctx.state.user.op,
    });
    this.ctx.success(res);
  }

  async resourceRoles() {
    const list = await this.scope.local.resource.resourceRoles({
      key: this.ctx.request.body.key,
      user: this.ctx.state.user.op,
    });
    this.ctx.success({ list });
  }

  async resourceRoleRemove() {
    // check demo
    this.ctx.bean.util.checkDemo();
    const res = await this.scope.local.resource.resourceRoleRemove({
      key: this.ctx.request.body.key,
      data: this.ctx.request.body.data,
      user: this.ctx.state.user.op,
    });
    this.ctx.success(res);
  }

  async resourceRoleAdd() {
    // check demo
    this.ctx.bean.util.checkDemo();
    const res = await this.scope.local.resource.resourceRoleAdd({
      key: this.ctx.request.body.key,
      data: this.ctx.request.body.data,
      user: this.ctx.state.user.op,
    });
    this.ctx.success(res);
  }
}
