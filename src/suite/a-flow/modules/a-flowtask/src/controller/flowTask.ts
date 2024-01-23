import { BeanBase, Controller, Use } from '@cabloy/core';
import { ScopeModuleAFlowtask } from '../index.js';

@Controller()
export class ControllerFlowTask extends BeanBase {
  @Use()
  scope: ScopeModuleAFlowtask;

  // options
  //   where, orders, page, history
  async select() {
    const options = this.ctx.request.body.options;
    options.page = this.ctx.bean.util.page(options.page);
    const items = await this.scope.local.flowTask.select({
      options,
      user: this.ctx.state.user.op,
    });
    this.ctx.successMore(items, options.page.index, options.page.size);
  }

  async count() {
    const options = this.ctx.request.body.options;
    const count = await this.scope.local.flowTask.count({
      options,
      user: this.ctx.state.user.op,
    });
    this.ctx.success(count);
  }

  async claim() {
    const res = await this.scope.local.flowTask.claim({
      flowTaskId: this.ctx.request.body.flowTaskId,
      user: this.ctx.state.user.op,
    });
    this.ctx.success(res);
  }

  async complete() {
    const res = await this.scope.local.flowTask.complete({
      flowTaskId: this.ctx.request.body.flowTaskId,
      handle: this.ctx.request.body.handle,
      formAtom: this.ctx.request.body.formAtom,
      user: this.ctx.state.user.op,
    });
    this.ctx.success(res);
  }

  async appendHandleRemark() {
    const res = await this.scope.local.flowTask.appendHandleRemark({
      flowTaskId: this.ctx.request.body.flowTaskId,
      handle: this.ctx.request.body.handle,
      user: this.ctx.state.user.op,
    });
    this.ctx.success(res);
  }

  async assignees() {
    const res = await this.scope.local.flowTask.assignees({
      flowTaskId: this.ctx.request.body.flowTaskId,
      user: this.ctx.state.user.op,
    });
    this.ctx.success(res);
  }

  async assigneesConfirmation() {
    const res = await this.scope.local.flowTask.assigneesConfirmation({
      flowTaskId: this.ctx.request.body.flowTaskId,
      handle: this.ctx.request.body.handle,
      user: this.ctx.state.user.op,
    });
    this.ctx.success(res);
  }

  async recall() {
    const res = await this.scope.local.flowTask.recall({
      flowTaskId: this.ctx.request.body.flowTaskId,
      user: this.ctx.state.user.op,
    });
    this.ctx.success(res);
  }

  async cancelFlow() {
    const res = await this.scope.local.flowTask.cancelFlow({
      flowTaskId: this.ctx.request.body.flowTaskId,
      handle: this.ctx.request.body.handle,
      user: this.ctx.state.user.op,
    });
    this.ctx.success(res);
  }

  async viewAtom() {
    const res = await this.scope.local.flowTask.viewAtom({
      flowTaskId: this.ctx.request.body.flowTaskId,
      user: this.ctx.state.user.op,
    });
    this.ctx.success(res);
  }

  async editAtom() {
    const res = await this.scope.local.flowTask.editAtom({
      flowTaskId: this.ctx.request.body.flowTaskId,
      user: this.ctx.state.user.op,
    });
    this.ctx.success(res);
  }

  async userSelectForward() {
    const { flowTaskId, params } = this.ctx.request.body;
    const user = this.ctx.state.user.op;
    const page = params.page;
    const items = await this.scope.local.flowTask.userSelectForward({
      flowTaskId,
      params,
      user,
    });
    this.ctx.successMore(items, page.index, page.size);
  }

  async forward() {
    const res = await this.scope.local.flowTask.forward({
      flowTaskId: this.ctx.request.body.flowTaskId,
      handle: this.ctx.request.body.handle,
      user: this.ctx.state.user.op,
    });
    this.ctx.success(res);
  }

  async forwardRecall() {
    const res = await this.scope.local.flowTask.forwardRecall({
      flowTaskId: this.ctx.request.body.flowTaskId,
      user: this.ctx.state.user.op,
    });
    this.ctx.success(res);
  }

  async userSelectSubstitute() {
    const { flowTaskId, params } = this.ctx.request.body;
    const user = this.ctx.state.user.op;
    const page = params.page;
    const items = await this.scope.local.flowTask.userSelectSubstitute({
      flowTaskId,
      params,
      user,
    });
    this.ctx.successMore(items, page.index, page.size);
  }

  async substitute() {
    const res = await this.scope.local.flowTask.substitute({
      flowTaskId: this.ctx.request.body.flowTaskId,
      handle: this.ctx.request.body.handle,
      user: this.ctx.state.user.op,
    });
    this.ctx.success(res);
  }

  async substituteRecall() {
    const res = await this.scope.local.flowTask.substituteRecall({
      flowTaskId: this.ctx.request.body.flowTaskId,
      user: this.ctx.state.user.op,
    });
    this.ctx.success(res);
  }

  async actions() {
    const res = await this.scope.local.flowTask.actions({
      flowTaskId: this.ctx.request.body.flowTaskId,
      user: this.ctx.state.user.op,
    });
    this.ctx.success(res);
  }
}
