import { BeanBase, Controller, Post } from 'vona';
import { ScopeModule } from '../.metadata/this.js';
import assert from 'assert';

@Controller({ path: 'queue', meta: { mode: 'unittest' } })
export class ControllerQueue extends BeanBase<ScopeModule> {
  @Post('pushAsync')
  async pushAsync() {
    // await this.scope.queue.test.
    const res = await this.ctx.meta.util.queuePushAsync({
      module: 'test-party',
      queueName: 'queueTest',
      data: { a: 1, b: 2 },
    });
    assert.equal(res, 3);
  }

  @Post('push')
  async push() {
    this.ctx.meta.util.queuePush({
      module: 'test-party',
      queueName: 'queueTest',
      data: { a: 1, b: 2 },
    });
  }
}
