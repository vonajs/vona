import { BeanBase, Controller } from 'vona';
import { ScopeModule } from '../.metadata/this.js';

@Controller()
export class ControllerTestCtxPerformAction extends BeanBase<ScopeModule> {
  async performAction() {
    // param: id
    const id = this.ctx.request.body.id;
    // performAction
    const res = await this.ctx.meta.util.performAction({
      method: 'post',
      url: '/api/test/party/test/ctx/performAction/echo',
      body: {
        id,
      },
    });
    this.app.success(res);
  }

  async echo() {
    // body: id
    const id = this.ctx.request.body.id;
    // echo back
    this.app.success(id);
  }
}
