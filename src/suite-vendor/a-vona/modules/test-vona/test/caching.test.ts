import assert from 'node:assert';
import { describe, it } from 'node:test';
import { app } from 'vona-mock';

describe('caching.test.ts', () => {
  it('action:caching', async () => {
    await app.bean.executor.mockCtx(async () => {
      const scopeTest = app.bean.scope('test-vona');
      // get: cacheKeyFn(string)
      const res = await scopeTest.service.caching.get(2);
      assert.equal(res.id, 2);
      // get: cacheKeyFn(function)
      const res2 = await scopeTest.service.caching.get2(2);
      assert.equal(res.id, res2.id);
      // get: cacheKey(celjs expression)
      const res3 = await scopeTest.service.caching.get3(2);
      assert.equal(res.id, res3.id);
      // get: cacheKey(default)
      const res4 = await scopeTest.service.caching.get4(2);
      assert.equal(res.id, res4.id);
      // get: cacheKey(default) not hit cache
      const res5 = await scopeTest.service.caching.get4(5);
      assert.equal(res5, undefined);
      // set: cacheKeyFn/cacheValueFn
      await scopeTest.service.caching.set(2, { ...res, name: `${res.name}!` });
      // get again
      const res6 = await scopeTest.service.caching.get4(2);
      assert.equal(res.id, res6.id);
      assert.equal(`${res.name}!`, res6.name);
      // set: cacheKey/cacheValue
      // await scopeTest.service.caching.set2(2, { ...res, name: `${res.name}!` });
      // get again
      // const res7 = await scopeTest.service.caching.get4(2);
      // assert.equal(res.id, res7.id);
      // assert.equal(`${res.name}!`, res7.name);
      // set: no cacheValue/cacheValueFn
      await scopeTest.service.caching.set3(2, { ...res, name: `${res.name}!` });
      // get again
      const res8 = await scopeTest.service.caching.get4(2);
      assert.equal(res.id, res8.id);
      assert.equal(`${res.name}!`, res8.name);
    });
  });
});
