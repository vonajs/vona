import { BeanBase } from 'vona';
import assert from 'node:assert';
import { Controller, Post } from 'vona-module-a-web';
import { Api } from 'vona-module-a-openapi';

@Controller({ path: 'queue', meta: { mode: 'unittest' } })
@Api.exclude()
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
