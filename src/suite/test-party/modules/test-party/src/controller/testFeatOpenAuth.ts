mport { BeanBase } from 'vona';
import { Controller } from 'vona-module-a-web';
import assert from 'assert';

@Controller()
export class ControllerTestFeatOpenAuth extends BeanBase {
  async resourceCheckSuccess() {
    const user = this.ctx.state.user.op;
    assert.equal(user.userName, 'root');
    this.app.success();
  }

  async resourceCheckFail() {
    const user = this.ctx.state.user.op;
    assert.equal(user.userName, 'root');
    this.app.success();
  }
}
