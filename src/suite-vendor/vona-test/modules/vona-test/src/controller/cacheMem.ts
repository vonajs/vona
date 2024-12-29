import assert from 'node:assert';
import { BeanBase, retry, sleep } from 'vona';
import { Api } from 'vona-module-a-openapi';
import { Controller, Post } from 'vona-module-a-web';

@Controller({ path: 'cacheMem', meta: { mode: 'unittest' } })
@Api.exclude()
export class ControllerCacheMem extends BeanBase {
  @Post()
  async mem() {
    let res;
    let value;

    // set
    value = this.scope.cacheMem.test.getset('zhen.nann');
    assert.equal(value, undefined);

    value = this.scope.cacheMem.test.getset('zhennann');
    assert.equal(value, 'zhen.nann');

    // has
    res = this.scope.cacheMem.test.has();
    assert.equal(!!res, true);

    // get
    value = this.scope.cacheMem.test.get();
    assert.equal(value, 'zhennann');

    // remove
    this.scope.cacheMem.test.remove();
    res = this.scope.cacheMem.test.has();
    assert.equal(res, false);

    // set again
    this.scope.cacheMem.test.set('zhennann'); // will be expired after 1s

    // get
    value = this.scope.cacheMem.test.get();
    assert.equal(value, 'zhennann');

    // peek after timeout
    await sleep(900);
    await retry({ retries: 3 }, async () => {
      await sleep(100);
      value = this.scope.cacheMem.test.peek();
      assert.equal(value, undefined);
    });
  }
}
