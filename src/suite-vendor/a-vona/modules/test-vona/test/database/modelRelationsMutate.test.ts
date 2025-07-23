import assert from 'node:assert';
import { describe, it } from 'node:test';
import { app } from 'vona-mock';

describe('modelRelationsMutate.test.ts', () => {
  it('action:modelRelationsMutate', async () => {
    await app.bean.executor.mockCtx(async () => {
      const prefix = 'action:modelRelationsMutate';
      // scope
      const scopeTest = app.bean.scope('test-vona');
      // insert: roles
      const roles = await scopeTest.model.role.insertBulk([
        { name: `${prefix}:family` },
        { name: `${prefix}:friend` },
      ]);
      assert.equal(roles.length, 2);
      assert.equal(roles[0].id !== undefined, true);
      // insert: users
      const users = await scopeTest.model.user.insertBulk([
        {
          name: `${prefix}:tom`,
          posts:[{}]
        },
      ],{'include':{'posts':{}}});
      // users[0]
      // delete: roles
      await scopeTest.model.role.deleteBulk(roles.map(item => item.id!));
      const roles2 = await scopeTest.model.role.select({
        where: {
          id: roles.map(item => item.id!),
        },
      }, { disableDeleted: true });
      assert.equal(roles2.length, 2);
      assert.equal(roles2[0].id !== undefined, true);
      assert.equal(roles2[0].deleted, true);
    });
  });
});
