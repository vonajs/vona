import assert from 'node:assert';
import { BeanBase } from 'vona';
import { Api } from 'vona-module-a-openapi';
import { Public } from 'vona-module-a-user';
import { Controller, Post } from 'vona-module-a-web';

@Controller({ path: 'queue', meta: { mode: 'test' } })
@Api.exclude()
export class ControllerQueue extends BeanBase {
  @Post('pushAsync')
  @Public()
  async pushAsync() {
    const res = await this.scope.queue.test.pushAsync({ a: 1, b: 2 });
    assert.equal(res, 3);
  }

  @Post('push')
  @Public()
  push() {
    this.scope.queue.test.push({ a: 1, b: 2 });
  }
}
