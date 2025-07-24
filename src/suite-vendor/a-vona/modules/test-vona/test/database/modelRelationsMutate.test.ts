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
          posts: [{
            title: `${prefix}:postApple`,
            postContent: {
              content: `${prefix}:postContentApple`,
            },
          }],
          roles: [{
            id: roles[0].id,
          }],
        },
      ], { include: {
        posts: { include: { postContent: true } },
        roles: true,
      } });
      assert.equal(users.length, 1);
      const post = await scopeTest.model.post.get({ id: users[0].posts[0].id }, { include: { postContent: true } });
      assert.equal(post?.postContent?.content, `${prefix}:postContentApple`);
      // update: users
      await scopeTest.model.user.update({
        id: users[0].id,

      }, { include: {} });
      // delete: users
      await scopeTest.model.user.deleteBulk(users.map(item => item.id), {
        include: { posts: true, roles: true },
      });
      const roleUsers = await scopeTest.model.roleUser.select({ where: { userId: users.map(item => item.id) } });
      assert.equal(roleUsers.length, 0);
      // delete: roles
      await scopeTest.model.role.deleteBulk(roles.map(item => item.id));
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
