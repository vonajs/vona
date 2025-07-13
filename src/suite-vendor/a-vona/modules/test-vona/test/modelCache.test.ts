import assert from 'node:assert';
import { describe, it } from 'node:test';
import { app } from 'vona-mock';

describe.only('modelCache.test.ts', () => {
  it('action:modelCache:cacheQuery', async () => {
    await app.bean.executor.mockCtx(async () => {
      const prefix = 'action:modelCache:cacheQuery';
      // scope
      const scopeTest = app.bean.scope('test-vona');
      // create
      const _user = await scopeTest.model.user.insert({ name: `${prefix}:1` });
      // select
      let items = await scopeTest.model.user.select({ where: { name: `${prefix}:1` } });
      assert.equal(items.length, 1);
      // select again
      items = await scopeTest.model.user.select({ where: { name: `${prefix}:1` } });
      assert.equal(items.length, 1);
      // delete
      await scopeTest.model.user.delete({ name: `${prefix}:1` });
      // select
      items = await scopeTest.model.user.select({ where: { name: `${prefix}:1` } });
      assert.equal(items.length, 0);
    });
  });
});
