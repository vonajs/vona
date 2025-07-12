import assert from 'node:assert';
import { describe, it } from 'node:test';
import { app } from 'vona-mock';
import { $relationDynamic } from 'vona-module-a-database';
import { ModelPost, ModelPostContent, ModelRoleUser, ModelUser } from 'vona-module-test-vona';

describe('modelRelations.test.ts', () => {
  it('action:modelRelations', async () => {
    await app.bean.executor.mockCtx(async () => {
      const prefix = 'action:modelRelations';
      // scope
      const scopeTest = app.bean.scope('test-vona');
      // test data: create
      const testData = await scopeTest.service.testData.create(prefix);
      const {
        userTom,
        userJimmy,
        roleFamily,
        roleFriend,
        postApple,
        postPear,
        postContentApple,
      } = testData;
      // relation: hasOne
      const posts = await scopeTest.model.post.select({
        where: {
          id: [post1.id, post2.id],
        },
        orders: [['id', 'asc']],
        include: { postContent: true },
      });
      assert.equal(posts.length, 2);
      assert.equal(posts[0].postContent?.content, 'action:modelRelations:postContentApple');
      assert.equal(posts[1].postContent, undefined);
      // relation: hasOne: get
      const postGet = await scopeTest.model.post.get(
        { id: post1.id },
        { include: { postContent: true } },
      );
      assert.equal(postGet?.postContent?.content, 'action:modelRelations:postContentApple');
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
      assert.equal(postContents[0].post?.title, 'action:modelRelations:postApple');
      // relation: belongsTo: get
      const postContentGet = await scopeTest.model.postContent.get(
        { id: postContent1.id },
        { include: { post: true } },
      );
      assert.equal(postContentGet?.post?.title, 'action:modelRelations:postApple');
      // relation: belongsTo: autoload
      const postAutoload = await scopeTest.model.post.get(
        { id: post1.id },
      );
      assert.equal(postAutoload!.user?.id, postAutoload!.userId);
      assert.equal(Object.keys(postAutoload!.user!).length, 2); // id + name
      // relation: hasMany
      const users = await scopeTest.model.user.select({
        where: {
          id: [userTom.id, user2.id],
        },
        orders: [['id', 'asc']],
        include: { posts: true },
      });
      assert.equal(users.length, 2);
      assert.equal(users[0].posts.length, 2);
      assert.equal(users[1].posts.length, 0);
      // relation: hasMany: get
      const userGet = await scopeTest.model.user.get(
        { id: userTom.id },
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
          'testVonaUser.id': userTom.id,
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
      }, {}, ['test-vona:user']);
      assert.equal(itemsJoins2.length, 0);
      // test data: delete
      await scopeTest.service.testData.drop(testData);
    });
  });
});
