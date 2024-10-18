import { BeanBase, Controller } from 'vona';
import { ScopeModule } from '../resource/this.js';

@Controller()
export class ControllerResourceRight extends BeanBase<ScopeModule> {
  async rights() {
    const page = this.ctx.request.body.page;
    const items = await this.scope.local.resourceRight.rights({
      roleAtomId: this.ctx.request.body.key.atomId,
      page,
      user: this.ctx.state.user.op,
    });
    this.ctx.successMore(items, page.index, page.size);
  }

  async add() {
    // check demo
    this.ctx.bean.util.checkDemo();
    const res = await this.scope.local.resourceRight.add({
      roleAtomId: this.ctx.request.body.key.atomId,
      atomIds: this.ctx.request.body.atomIds,
      user: this.ctx.state.user.op,
    });
    this.ctx.success(res);
  }

  async delete() {
    // check demo
    this.ctx.bean.util.checkDemo();
    const res = await this.scope.local.resourceRight.delete({
      roleAtomId: this.ctx.request.body.key.atomId,
      atomId: this.ctx.request.body.atomId,
      user: this.ctx.state.user.op,
    });
    this.ctx.success(res);
  }

  async spreads() {
    const page = this.ctx.request.body.page;
    const items = await this.scope.local.resourceRight.spreads({
      roleAtomId: this.ctx.request.body.key.atomId,
      page,
      user: this.ctx.state.user.op,
    });
    this.ctx.successMore(items, page.index, page.size);
  }
}
