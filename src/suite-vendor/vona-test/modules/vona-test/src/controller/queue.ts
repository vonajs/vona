import { BeanBase, Controller, Post } from 'vona';
import { ScopeModule } from '../.metadata/this.js';
import assert from 'assert';

@Controller({ path: 'queue', meta: { mode: 'unittest' } })
export class ControllerQueue extends BeanBase<ScopeModule> {
  @Post('pushAsync')
  async pushAsync() {
    const res = await this.scope.queue.test.pushAsync({ a: 1, b: 2 });
    assert.equal(res, 3);
  }

  @Post('push')
  async push() {
    this.scope.queue.test.push({ a: 1, b: 2 });
  }
}
