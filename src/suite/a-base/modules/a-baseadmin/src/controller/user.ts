import { BeanBase } from 'vona';
import { Controller } from 'vona-module-a-web';

@Controller()
export class ControllerUser extends BeanBase {
  async select() {
    const page = this.app.bean.util.page(this.ctx.request.body.page);
    const items = await this.scope.service.user.select({
      query: this.ctx.request.body.query,
      page,
      user: this.ctx.state.user.op,
    });
    this.app.successMore(items, page.index!, page.size!);
  }

  async userRoles() {
    const page = this.ctx.request.body.page;
    const items = await this.scope.service.user.userRoles({
      userAtomId: this.ctx.request.body.key.atomId,
      page,
      user: this.ctx.state.user.op,
    });
    this.app.successMore(items, page.index, page.size);
  }

  async addUserRole() {
    // check demo
    this.app.bean.util.checkDemo();
    const res = await this.scope.service.user.addUserRole({
      userAtomId: this.ctx.request.body.key.atomId,
      roleId: this.ctx.request.body.roleId,
      user: this.ctx.state.user.op,
    });
    this.app.success(res);
  }

  async deleteUserRole() {
    // check demo
    this.app.bean.util.checkDemo();
    const res = await this.scope.service.user.deleteUserRole({
      userAtomId: this.ctx.request.body.key.atomId,
      roleId: this.ctx.request.body.roleId,
      user: this.ctx.state.user.op,
    });
    this.app.success(res);
  }

  async atomRights() {
    const page = this.ctx.request.body.page;
    const items = await this.scope.service.user.atomRights({
      userAtomId: this.ctx.request.body.key.atomId,
      page,
      user: this.ctx.state.user.op,
    });
    this.app.successMore(items, page.index, page.size);
  }

  async resourceRights() {
    const page = this.ctx.request.body.page;
    const items = await this.scope.service.user.resourceRights({
      userAtomId: this.ctx.request.body.key.atomId,
      page,
      user: this.ctx.state.user.op,
    });
    this.app.successMore(items, page.index, page.size);
  }
}
