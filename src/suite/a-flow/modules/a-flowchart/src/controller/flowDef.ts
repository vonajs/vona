import { BeanBase, Controller } from 'vona';
import { ScopeModule } from '../.metadata/this.js';

@Controller()
export class ControllerFlowDef extends BeanBase<ScopeModule> {
  async normalizeAssignees() {
    const { host, assignees } = this.ctx.request.body;
    const user = this.ctx.state.user.op;
    const res = await this.scope.service.flowDef.normalizeAssignees({
      host,
      assignees,
      user,
    });
    this.ctx.success(res);
  }

  async userSelect() {
    const { host, params } = this.ctx.request.body;
    const user = this.ctx.state.user.op;
    const page = params.page;
    const items = await this.scope.service.flowDef.userSelect({
      host,
      params,
      user,
    });
    this.ctx.successMore(items, page.index, page.size);
  }
}
