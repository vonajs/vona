import { BeanBase, Controller } from 'vona';
import assert from 'assert';

@Controller()
export class ControllerTestCtxConfig extends BeanBase {
  async test() {
    // current module
    let message = this.scope.config.message;
    assert.equal(message, 'Hello World');

    // other module
    message = this.$scope.testParty.config.message;
    assert.equal(message, 'Hello World');

    // done
    this.app.success();
  }
}
