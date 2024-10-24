import { BeanBase, Controller } from 'vona';
import { ScopeModule } from '../../../.metadata/this.js';
import assert from 'assert';

@Controller()
export class ControllerTestCtxConfig extends BeanBase<ScopeModule> {
  async test() {
    // current module
    let message = this.scope.config.message;
    assert.equal(message, 'Hello World');

    // other module
    message = this.getScope('test-party').config.message;
    assert.equal(message, 'Hello World');

    // done
    this.ctx.success();
  }
}
