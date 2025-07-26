import assert from 'node:assert';
import { describe, it } from 'node:test';
import { app } from 'vona-mock';

describe('modelAggregate.test.ts', () => {
  it.only('action:modelAggregate', async () => {
    await app.bean.executor.mockCtx(async () => {
      const prefix = 'action:modelAggregate';
      // scope
      const scopeTest = app.bean.scope('test-vona');
      // insert: roles
      const roles = await scopeTest.model.role.insertBulk([
        { name: `${prefix}:family` },
        { name: `${prefix}:friend` },
      ]);
      assert.equal(roles.length, 2);
      assert.equal(roles[0].id !== undefined, true);
      // create: users
      const users = await scopeTest.model.user.insertBulk([
        {
          name: `${prefix}:tom`,
          age: 3,
          posts: [
            {
              title: `${prefix}:postApple`,
              stars: 2,
              postContent: {
                content: `${prefix}:postContentApple`,
              },
            },
            {
              title: `${prefix}:postApple2`,
              stars: 3,
              postContent: {
                content: `${prefix}:postContentApple2`,
              },
            },
          ],
          roles: [{
            id: roles[0].id,
          }],
        },
        {
          name: `${prefix}:jimmy`,
          age: 5,
          posts: [{
            title: `${prefix}:postPear`,
            stars: 4,
            postContent: {
              content: `${prefix}:postContentPear`,
            },
          }],
        },
        { name: `${prefix}:mike` },
      ], {
        include: {
          posts: { include: { postContent: true } },
          roles: true,
        },
      });
      // aggr: user
      const userStats = await scopeTest.model.user.aggregate({
        aggrs: {
          count: ['*', 'age'],
          sum: ['age'],
          avg: 'age',
          max: 'age',
          min: 'age',
        },
        where: {
          name: { _startsWith_: `${prefix}:` },
        },
      });
      assert.equal(userStats.count_all, 3);
      assert.equal(userStats.count_age, 2);
      assert.equal(userStats.sum_age, 8);
      assert.equal(userStats.avg_age, 4);
      assert.equal(userStats.max_age, 5);
      assert.equal(userStats.min_age, 3);
      // aggr: usersStats
      const usersStats = await scopeTest.model.userStats.select({
        where: {
          id: users.map(item => item.id),
        },
        orders: [['id', 'asc']],
        include: {
          // 'posts':true // is autoload
          roles: true,
        },
      });
      assert.equal(usersStats.length, 3);
      assert.equal(usersStats[0].posts.count_all, 2);
      assert.equal(usersStats[0].posts.count_title, 2);
      assert.equal(usersStats[0].posts.sum_stars, 5);
      assert.equal(usersStats[0].roles.count_all, 1);
      // delete: users
      await scopeTest.model.user.deleteBulk(users.map(item => item.id), {
        include: {
          posts: { include: { postContent: true } },
          roles: true,
        },
      });
      // delete: roles
      await scopeTest.model.role.deleteBulk(roles.map(item => item.id));
    });
  });
});
