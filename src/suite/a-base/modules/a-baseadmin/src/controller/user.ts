import { BeanBase, Controller } from 'vona';
import { ScopeModule } from '../resource/this.js';

@Controller()
export class ControllerUser extends BeanBase<ScopeModule> {
  async select() {
    const page = this.ctx.bean.util.page(this.ctx.request.body.page);
    const items = await this.scope.local.user.select({
      query: this.ctx.request.body.query,
      page,
      user: this.ctx.state.user.op,
    });
    this.ctx.successMore(items, page.index, page.size);
  }

  async userRoles() {
    const page = this.ctx.request.body.page;
    const items = await this.scope.local.user.userRoles({
      userAtomId: this.ctx.request.body.key.atomId,
      page,
      user: this.ctx.state.user.op,
    });
    this.ctx.successMore(items, page.index, page.size);
  }

  async addUserRole() {
    // check demo
    this.ctx.bean.util.checkDemo();
    const res = await this.scope.local.user.addUserRole({
      userAtomId: this.ctx.request.body.key.atomId,
      roleId: this.ctx.request.body.roleId,
      user: this.ctx.state.user.op,
    });
    this.ctx.success(res);
  }

  async deleteUserRole() {
    // check demo
    this.ctx.bean.util.checkDemo();
    const res = await this.scope.local.user.deleteUserRole({
      userAtomId: this.ctx.request.body.key.atomId,
      roleId: this.ctx.request.body.roleId,
      user: this.ctx.state.user.op,
    });
    this.ctx.success(res);
  }

  async atomRights() {
    const page = this.ctx.request.body.page;
    const items = await this.scope.local.user.atomRights({
      userAtomId: this.ctx.request.body.key.atomId,
      page,
      user: this.ctx.state.user.op,
    });
    this.ctx.successMore(items, page.index, page.size);
  }

  async resourceRights() {
    const page = this.ctx.request.body.page;
    const items = await this.scope.local.user.resourceRights({
      userAtomId: this.ctx.request.body.key.atomId,
      page,
      user: this.ctx.state.user.op,
    });
    this.ctx.successMore(items, page.index, page.size);
  }
}
