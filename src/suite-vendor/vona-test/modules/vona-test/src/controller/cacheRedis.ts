import assert from 'node:assert';
import { sleep } from '@cabloy/utils';
import { BeanBase, retry } from 'vona';
import { Api } from 'vona-module-a-openapi';
import { Passport } from 'vona-module-a-user';
import { Controller, Web } from 'vona-module-a-web';

@Controller({ path: 'cacheRedis', meta: { mode: 'test' } })
@Api.exclude()
@Passport.public()
export class ControllerCacheRedis extends BeanBase {
  @Web.post()
  async redis() {
    let res;
    let value;

    // getset
    value = await this.scope.cacheRedis.test.getset('zhen.nann');
    assert.equal(value, undefined);

    value = await this.scope.cacheRedis.test.getset('zhennann');
    assert.equal(value, 'zhen.nann');

    // has
    res = await this.scope.cacheRedis.test.has();
    assert.equal(res, true);

    // get
    value = await this.scope.cacheRedis.test.get();
    assert.equal(value, 'zhennann');

    // del
    await this.scope.cacheRedis.test.del();
    res = await this.scope.cacheRedis.test.has();
    assert.equal(res, false);

    // set again
    await this.scope.cacheRedis.test.set('zhennann'); // will be expired after 1s

    // get
    value = await this.scope.cacheRedis.test.get();
    assert.equal(value, 'zhennann');

    // peek after timeout
    await sleep(900);
    await retry({ retries: 3 }, async () => {
      await sleep(100);
      value = await this.scope.cacheRedis.test.peek();
      assert.equal(value, undefined);
    });
  }
}
