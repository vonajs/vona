import assert from 'node:assert';
import { sleep } from '@cabloy/utils';
import { BeanBase, retry } from 'vona';
import { Api } from 'vona-module-a-openapi';
import { Public } from 'vona-module-a-user';
import { Controller, Post } from 'vona-module-a-web';

@Controller({ path: 'cacheMem', meta: { mode: 'test' } })
@Api.exclude()
@Public()
export class ControllerCacheMem extends BeanBase {
  @Web.post()
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

    // del
    this.scope.cacheMem.test.del();
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
