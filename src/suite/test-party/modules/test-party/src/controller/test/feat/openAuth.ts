import { BeanBase, Controller } from '@cabloy/core';
import { ScopeModule } from '../../../resource/this.js';
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
