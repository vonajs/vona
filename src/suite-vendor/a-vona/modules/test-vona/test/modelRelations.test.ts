import assert from 'node:assert';
import { describe, it } from 'node:test';
import { app } from 'vona-mock';
import { $relationDynamic } from 'vona-module-a-database';
import { ModelPost, ModelPostContent, ModelRoleUser, ModelUser } from 'vona-module-test-vona';

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
        orders: [['id', 'asc']],
        include: { postContent: true },
      });
      assert.equal(posts.length, 2);
      assert.equal(posts[0].postContent?.content, 'content1');
      assert.equal(posts[1].postContent, undefined);
      // relation: hasOne: get
      const postGet = await scopeTest.model.post.get(
        { id: post1.id },
        { include: { postContent: true } },
      );
      assert.equal(postGet?.postContent?.content, 'content1');
      // relation: hasOne: columns
      const postGetColumns = await scopeTest.model.post.get(
        { id: post1.id },
        { columns: ['id'], include: { postContent: { columns: ['id'] } } },
      );
      assert.equal(postGetColumns?.postContent?.content, undefined);
      assert.equal(Object.keys(postGetColumns!.postContent!).length, 1);
      assert.equal(Object.keys(postGetColumns!).length, 1 + 2);// .user + .postContent
      // relation: belongsTo
      const postContents = await scopeTest.model.postContent.select({
        where: {
          id: postContent1.id,
        },
        include: { post: true },
      });
      assert.equal(postContents.length, 1);
      assert.equal(postContents[0].post?.title, 'post1');
      // relation: belongsTo: get
      const postContentGet = await scopeTest.model.postContent.get(
        { id: postContent1.id },
        { include: { post: true } },
      );
      assert.equal(postContentGet?.post?.title, 'post1');
      // relation: belongsTo: autoload
      const postAutoload = await scopeTest.model.post.get(
        { id: post1.id },
      );
      assert.equal(postAutoload!.user?.id, postAutoload!.userId);
      assert.equal(Object.keys(postAutoload!.user!).length, 2); // id + name
      // relation: hasMany
      const users = await scopeTest.model.user.select({
        where: {
          id: [user1.id, user2.id],
        },
        orders: [['id', 'asc']],
        include: { posts: true },
      });
      assert.equal(users.length, 2);
      assert.equal(users[0].posts.length, 2);
      assert.equal(users[1].posts.length, 0);
      // relation: hasMany: get
      const userGet = await scopeTest.model.user.get(
        { id: user1.id },
        { include: { posts: true } },
      );
      assert.equal(userGet?.posts.length, 2);
      // relation: belongsToMany
      const roles = await scopeTest.model.role.select({
        where: {
          id: [role1.id, role2.id],
        },
        orders: [['id', 'asc']],
        include: { users: true },
      });
      assert.equal(roles.length, 2);
      assert.equal(roles[0].users.length, 2);
      assert.equal(roles[1].users.length, 1);
      // relation: belongsToMany: get
      const roleGet = await scopeTest.model.role.get(
        { id: role1.id },
        { include: { users: true } },
      );
      assert.equal(roleGet?.users.length, 2);
      // relation: belongsToMany: mget
      const roles2 = await scopeTest.model.role.mget([role1.id, role2.id], { include: { users: true } });
      assert.equal(roles2.length, 2);
      assert.equal(roles2[0].users.length, 2);
      assert.equal(roles2[1].users.length, 1);
      // relation: include + with
      const items = await scopeTest.model.post.select(
        {
          include: {
            postContent: {
              include: {
                post: { include: { user: { columns: '*' } } },
              },
              with: {
                post3: $relationDynamic.belongsTo(() => ModelPostContent, () => ModelPost, 'postId', {
                  include: {
                    postContent: true,
                  },
                }),
              },
            },
          },
          with: {
            user3: $relationDynamic.belongsTo(ModelPost, () => ModelUser, 'userId', {
              include: { posts: true },
              with: { roles: $relationDynamic.belongsToMany(() => ModelRoleUser, () => ModelPostContent, 'userId', 'roleId') },
              columns: ['id', 'name'],
            }),
          },
        },
      );
      assert.equal(Object.keys(items[0].postContent!.post!.user!).length > 5, true);
      assert.equal(items[0].postContent?.post3?.postContent?.content !== undefined, true);
      assert.equal(items[0].user3!.posts.length > 0, true);
      assert.equal(items[0].user3!.roles.length > 0, true);
      // joins: auto
      const itemsJoins = await scopeTest.model.post.select({
        joins: [['innerJoin', 'testVonaUser', ['testVonaPost.userId', 'testVonaUser.id']]],
        where: {
          'testVonaUser.id': user1.id,
        },
        orders: [['testVonaUser.id', 'asc']],
      });
      assert.equal(itemsJoins.length, 2);
      // joins: manual
      const itemsJoins2 = await scopeTest.model.post.select({
        joins: [['innerJoin', 'testVonaUser', ['testVonaPost.userId', 'testVonaUser.id']]],
        where: {
          'testVonaUser.id': user2.id,
        },
        orders: [['testVonaUser.id', 'asc']],
      }, ['test-vona:user']);
      assert.equal(itemsJoins2.length, 0);
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
