import { BeanBase, Controller } from 'vona';
import { ScopeModule } from '../.metadata/this.js';

@Controller()
export class ControllerFlowTask extends BeanBase<ScopeModule> {
  // options
  //   where, orders, page, history
  async select() {
    const options = this.ctx.request.body.options;
    options.page = this.app.bean.util.page(options.page);
    const items = await this.scope.service.flowTask.select({
      options,
      user: this.ctx.state.user.op,
    });
    this.app.successMore(items, options.page.index, options.page.size);
  }

  async count() {
    const options = this.ctx.request.body.options;
    const count = await this.scope.service.flowTask.count({
      options,
      user: this.ctx.state.user.op,
    });
    this.app.success(count);
  }

  async claim() {
    const res = await this.scope.service.flowTask.claim({
      flowTaskId: this.ctx.request.body.flowTaskId,
      user: this.ctx.state.user.op,
    });
    this.app.success(res);
  }

  async complete() {
    const res = await this.scope.service.flowTask.complete({
      flowTaskId: this.ctx.request.body.flowTaskId,
      handle: this.ctx.request.body.handle,
      formAtom: this.ctx.request.body.formAtom,
      user: this.ctx.state.user.op,
    });
    this.app.success(res);
  }

  async appendHandleRemark() {
    const res = await this.scope.service.flowTask.appendHandleRemark({
      flowTaskId: this.ctx.request.body.flowTaskId,
      handle: this.ctx.request.body.handle,
      user: this.ctx.state.user.op,
    });
    this.app.success(res);
  }

  async assignees() {
    const res = await this.scope.service.flowTask.assignees({
      flowTaskId: this.ctx.request.body.flowTaskId,
      user: this.ctx.state.user.op,
    });
    this.app.success(res);
  }

  async assigneesConfirmation() {
    const res = await this.scope.service.flowTask.assigneesConfirmation({
      flowTaskId: this.ctx.request.body.flowTaskId,
      handle: this.ctx.request.body.handle,
      user: this.ctx.state.user.op,
    });
    this.app.success(res);
  }

  async recall() {
    const res = await this.scope.service.flowTask.recall({
      flowTaskId: this.ctx.request.body.flowTaskId,
      user: this.ctx.state.user.op,
    });
    this.app.success(res);
  }

  async cancelFlow() {
    const res = await this.scope.service.flowTask.cancelFlow({
      flowTaskId: this.ctx.request.body.flowTaskId,
      handle: this.ctx.request.body.handle,
      user: this.ctx.state.user.op,
    });
    this.app.success(res);
  }

  async viewAtom() {
    const res = await this.scope.service.flowTask.viewAtom({
      flowTaskId: this.ctx.request.body.flowTaskId,
      user: this.ctx.state.user.op,
    });
    this.app.success(res);
  }

  async editAtom() {
    const res = await this.scope.service.flowTask.editAtom({
      flowTaskId: this.ctx.request.body.flowTaskId,
      user: this.ctx.state.user.op,
    });
    this.app.success(res);
  }

  async userSelectForward() {
    const { flowTaskId, params } = this.ctx.request.body;
    const user = this.ctx.state.user.op;
    const page = params.page;
    const items = await this.scope.service.flowTask.userSelectForward({
      flowTaskId,
      params,
      user,
    });
    this.app.successMore(items, page.index, page.size);
  }

  async forward() {
    const res = await this.scope.service.flowTask.forward({
      flowTaskId: this.ctx.request.body.flowTaskId,
      handle: this.ctx.request.body.handle,
      user: this.ctx.state.user.op,
    });
    this.app.success(res);
  }

  async forwardRecall() {
    const res = await this.scope.service.flowTask.forwardRecall({
      flowTaskId: this.ctx.request.body.flowTaskId,
      user: this.ctx.state.user.op,
    });
    this.app.success(res);
  }

  async userSelectSubstitute() {
    const { flowTaskId, params } = this.ctx.request.body;
    const user = this.ctx.state.user.op;
    const page = params.page;
    const items = await this.scope.service.flowTask.userSelectSubstitute({
      flowTaskId,
      params,
      user,
    });
    this.app.successMore(items, page.index, page.size);
  }

  async substitute() {
    const res = await this.scope.service.flowTask.substitute({
      flowTaskId: this.ctx.request.body.flowTaskId,
      handle: this.ctx.request.body.handle,
      user: this.ctx.state.user.op,
    });
    this.app.success(res);
  }

  async substituteRecall() {
    const res = await this.scope.service.flowTask.substituteRecall({
      flowTaskId: this.ctx.request.body.flowTaskId,
      user: this.ctx.state.user.op,
    });
    this.app.success(res);
  }

  async actions() {
    const res = await this.scope.service.flowTask.actions({
      flowTaskId: this.ctx.request.body.flowTaskId,
      user: this.ctx.state.user.op,
    });
    this.app.success(res);
  }
}
