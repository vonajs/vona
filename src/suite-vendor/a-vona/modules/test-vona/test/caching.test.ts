import assert from 'node:assert';
import { describe, it } from 'node:test';
import { app } from 'vona-mock';

describe.only('caching.test.ts', () => {
  it('action:caching', async () => {
    await app.bean.executor.mockCtx(async () => {
      const scopeTest = app.bean.scope('test-vona');
      // get: cacheKeyFn(string)
      const res = await scopeTest.service.caching.get(2);
      assert.equal(res.id, 2);
      // get: cacheKeyFn(function)
      const res2 = await scopeTest.service.caching.get2(2);
      assert.equal(res.id, res2.id);
    });
  });
});
