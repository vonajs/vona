import assert from 'node:assert';
import { describe, it } from 'node:test';
import { app } from 'vona-mock';

describe('modelRelations.test.ts', () => {
  it('action:modelRelations', async () => {
    await app.bean.executor.mockCtx(async () => {
      // scope
      const scopeTest = app.bean.scope('test-vona');
      // test data: create
      const user1 = await scopeTest.model.user.insert({ name: 'tom' });
      const user2 = await scopeTest.model.user.insert({ name: 'jimmy' });
      const role1 = await scopeTest.model.role.insert({ name: 'family' });
      const role2 = await scopeTest.model.role.insert({ name: 'friend' });
      await scopeTest.model.roleUser.batchInsert([
        { userId: user1.id, roleId: role1.id },
        { userId: user1.id, roleId: role2.id },
        { userId: user2.id, roleId: role1.id },
      ]);
      const post1 = await scopeTest.model.post.insert({ title: 'post1', userId: user1.id });
      const post2 = await scopeTest.model.post.insert({ title: 'post2', userId: user1.id });
      const postContent1 = await scopeTest.model.postContent.insert({ content: 'content1', postId: post1.id });
      // relation: hasOne
      const posts = await scopeTest.model.post.select({
        where: {
          id: [post1.id, post2.id],
        },
        include: { postContent: true },
      });
      assert.equal(posts.length, 2);
      console.log(posts);
      // test data: delete
      await scopeTest.model.postContent.delete({ id: postContent1.id });
      await scopeTest.model.post.delete({ id: post1.id });
      await scopeTest.model.post.delete({ id: post2.id });
      await scopeTest.model.roleUser.delete({ userId: user1.id });
      await scopeTest.model.roleUser.delete({ userId: user2.id });
      await scopeTest.model.role.delete({ id: role1.id });
      await scopeTest.model.role.delete({ id: role2.id });
      await scopeTest.model.user.delete({ id: user1.id });
      await scopeTest.model.user.delete({ id: user2.id });
    });
  });
});
