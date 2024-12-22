import { BeanBase } from 'vona';
import assert from 'assert';
import { Controller, Post } from 'vona-module-a-web';

@Controller({ path: 'queue', meta: { mode: 'unittest' } })
export class ControllerQueue extends BeanBase {
  @Post('pushAsync')
  async pushAsync() {
    const res = await this.scope.queue.test.pushAsync({ a: 1, b: 2 });
    assert.equal(res, 3);
  }

  @Post('push')
  push() {
    this.scope.queue.test.push({ a: 1, b: 2 });
  }
}
