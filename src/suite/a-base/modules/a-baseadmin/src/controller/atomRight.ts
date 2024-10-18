import { BeanBase, Controller } from 'vona';
import { ScopeModule } from '../resource/this.js';

@Controller()
export class ControllerAtomRight extends BeanBase<ScopeModule> {
  async rights() {
    const page = this.ctx.request.body.page;
    const items = await this.scope.local.atomRight.rights({
      roleAtomId: this.ctx.request.body.key.atomId,
      page,
      user: this.ctx.state.user.op,
    });
    this.ctx.successMore(items, page.index, page.size);
  }

  async add() {
    // check demo
    this.ctx.bean.util.checkDemo();
    const res = await this.scope.local.atomRight.add({
      roleAtomId: this.ctx.request.body.key.atomId,
      atomClass: this.ctx.request.body.atomClassTarget,
      actionCode: this.ctx.request.body.actionCode,
      scopeSelf: this.ctx.request.body.scopeSelf,
      scope: this.ctx.request.body.scope,
      user: this.ctx.state.user.op,
    });
    this.ctx.success(res);
  }

  async delete() {
    // check demo
    this.ctx.bean.util.checkDemo();
    const res = await this.scope.local.atomRight.delete({
      roleAtomId: this.ctx.request.body.key.atomId,
      roleRightId: this.ctx.request.body.roleRightId,
      user: this.ctx.state.user.op,
    });
    this.ctx.success(res);
  }

  async spreads() {
    const page = this.ctx.request.body.page;
    const items = await this.scope.local.atomRight.spreads({
      roleAtomId: this.ctx.request.body.key.atomId,
      page,
      user: this.ctx.state.user.op,
    });
    this.ctx.successMore(items, page.index, page.size);
  }
}
