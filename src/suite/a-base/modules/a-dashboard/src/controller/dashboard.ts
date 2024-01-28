import { BeanBase, Controller, Use } from '@cabloy/core';
import { ScopeModule } from '../resource/this.js';

@Controller()
export class ControllerDashboard extends BeanBase<ScopeModule> {
  async itemByKey() {
    const res = await this.scope.local.dashboard.itemByKey({
      atomStaticKey: this.ctx.request.body.atomStaticKey,
      user: this.ctx.state.user.op,
    });
    this.ctx.success(res);
  }

  async item() {
    const res = await this.scope.local.dashboard.item({
      dashboardAtomId: this.ctx.request.body.key.atomId,
      dashboardUserCheck: this.ctx.request.body.dashboardUserCheck,
      user: this.ctx.state.user.op,
    });
    this.ctx.success(res);
  }

  async loadItemUser() {
    const res = await this.scope.local.dashboard.loadItemUser({
      dashboardUserId: this.ctx.request.body.dashboardUserId,
      user: this.ctx.state.user.op,
    });
    this.ctx.success(res);
  }

  async saveItemUser() {
    const res = await this.scope.local.dashboard.saveItemUser({
      dashboardUserId: this.ctx.request.body.dashboardUserId,
      content: this.ctx.request.body.content,
      user: this.ctx.state.user.op,
    });
    this.ctx.success(res);
  }

  async changeItemUserName() {
    const res = await this.scope.local.dashboard.changeItemUserName({
      dashboardUserId: this.ctx.request.body.dashboardUserId,
      dashboardName: this.ctx.request.body.dashboardName,
      user: this.ctx.state.user.op,
    });
    this.ctx.success(res);
  }

  async deleteItemUser() {
    const res = await this.scope.local.dashboard.deleteItemUser({
      dashboardUserId: this.ctx.request.body.dashboardUserId,
      user: this.ctx.state.user.op,
    });
    this.ctx.success(res);
  }

  async createItemUser() {
    const res = await this.scope.local.dashboard.createItemUser({
      dashboardAtomId: this.ctx.request.body.key.atomId,
      user: this.ctx.state.user.op,
    });
    this.ctx.success(res);
  }

  async itemUsers() {
    const res = await this.scope.local.dashboard.itemUsers({
      dashboardAtomId: this.ctx.request.body.key.atomId,
      user: this.ctx.state.user.op,
    });
    this.ctx.success(res);
  }

  async changeItemUserDefault() {
    const res = await this.scope.local.dashboard.changeItemUserDefault({
      dashboardAtomId: this.ctx.request.body.key.atomId,
      dashboardUserId: this.ctx.request.body.dashboardUserId,
      user: this.ctx.state.user.op,
    });
    this.ctx.success(res);
  }
}
