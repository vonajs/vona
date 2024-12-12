import { BeanBase, Controller } from 'vona';
import assert from 'assert';

@Controller()
export class ControllerTestFeatInstance extends BeanBase {
  async instance() {
    assert.equal(!!this.ctx.instance.id, true);
    assert.equal(!!this.ctx.instance.config, true);
    this.app.success();
  }
}
