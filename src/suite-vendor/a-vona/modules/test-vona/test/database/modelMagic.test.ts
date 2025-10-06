import assert from 'node:assert';
import { describe, it } from 'node:test';
import { app } from 'vona-mock';

describe('modelMagic.test.ts', () => {
  it('action:modelMagic', async () => {
    await app.bean.executor.mockCtx(async () => {
      const name = 'modelMagic:001';
      // scope
      const scopeTest = app.bean.scope('test-vona');
      // create
      const item = await scopeTest.model.user.insert({ name });
      assert.equal(item.name, name);
      // getById
      let user = await scopeTest.model.user.getById(item.id);
      assert.equal(user?.name, name);
      // getByName
      user = await scopeTest.model.user.getByName(name);
      assert.equal(user?.name, name);
      user = await scopeTest.model.user.getByNameEqI(name.toUpperCase());
      assert.equal(user?.name, name);
      const users = await scopeTest.model.user.selectByName(name, { columns: ['age', 'name'] });
      assert.equal(users[0].name, name);
      // delete
      await scopeTest.model.user.delete({ id: item.id });
    });
  });
});
