import { BeanBase, Controller } from 'vona';
import { ScopeModule } from '../../../.metadata/this.js';
import assert from 'assert';

@Controller()
export class ControllerTestFeatOpenAuth extends BeanBase<ScopeModule> {
  async resourceCheckSuccess() {
    const user = this.ctx.state.user.op;
    assert.equal(user.userName, 'root');
    this.ctx.success();
  }

  async resourceCheckFail() {
    const user = this.ctx.state.user.op;
    assert.equal(user.userName, 'root');
    this.ctx.success();
  }
}
