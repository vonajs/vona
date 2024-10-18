import { BeanBase, Controller } from 'vona';
import { ScopeModule } from '../../../resource/this.js';
import assert from 'assert';

@Controller()
export class ControllerTestFeatQueue extends BeanBase<ScopeModule> {
  async pushAsync() {
    const res = await this.ctx.meta.util.queuePushAsync({
      module: 'test-party',
      queueName: 'queueTest',
      data: { a: 1, b: 2 },
    });
    assert.equal(res, 3);
    this.ctx.success();
  }

  async push() {
    this.ctx.meta.util.queuePush({
      module: 'test-party',
      queueName: 'queueTest',
      data: { a: 1, b: 2 },
    });
    this.ctx.success();
  }
}
