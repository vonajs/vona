mport { BeanBase } from 'vona';
import { Controller } from 'vona-module-a-web';

@Controller()
export class ControllerFlowDef extends BeanBase {
  async normalizeAssignees() {
    const { host, assignees } = this.ctx.request.body;
    const user = this.ctx.state.user.op;
    const res = await this.scope.service.flowDef.normalizeAssignees({
      host,
      assignees,
      user,
    });
    this.app.success(res);
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
    this.app.successMore(items, page.index, page.size);
  }
}
