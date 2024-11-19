import { BeanBase, Controller } from 'vona';
import { ScopeModule } from '../.metadata/this.js';

@Controller()
export class ControllerTestCtxResponse extends BeanBase<ScopeModule> {
  async success() {
    const res = {
      userName: 'zhennann',
    };
    this.app.success(res);
  }

  async successMore() {
    const page = this.ctx.request.body.page;
    const items = [{ userName: 'zhennann' }, { userName: 'root' }];
    this.app.successMore(items, page.index, page.size);
  }

  async fail() {
    // Error Test
    this.app.fail(1001);
  }

  async throwError() {
    this.app.throw(1001);
  }
}
