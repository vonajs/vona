import assert from 'node:assert';
import { describe, it } from 'node:test';
import { app } from 'vona-mock';

describe('modelMagic.test.ts', () => {
  it('action:modelMagic', async () => {
    await app.bean.executor.mockCtx(async () => {
      const name = 'modelMagic001';
      // scope
      const scopeTest = app.bean.scope('test-vona');
      // create
      const item = await scopeTest.model.user.insert({ name });
      assert.equal(item.name, name);
      // getById
      const user = await scopeTest.model.user.getById(item.id);
      assert.equal(user?.name, name);
      // delete
      await scopeTest.model.user.delete({ id: item.id });
    });
  });
});
