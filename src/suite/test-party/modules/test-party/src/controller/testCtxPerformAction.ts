mport { BeanBase } from 'vona';
import { Controller } from 'vona-module-a-web';

@Controller()
export class ControllerTestCtxPerformAction extends BeanBase {
  async performAction() {
    // param: id
    const id = this.ctx.request.body.id;
    // performAction
    const res = await this.bean.executor.performAction({
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
