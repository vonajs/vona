import assert from 'node:assert';
import { describe, it } from 'node:test';
import { app } from 'vona-mock';

describe('modelAggregate.test.ts', () => {
  it('action:modelAggregate', async () => {
    await app.bean.executor.mockCtx(async () => {
      const prefix = 'action:modelAggregate';
      // scope
      const scopeTest = app.bean.scope('test-vona');
      // create
      const users = await scopeTest.model.user.insertBulk([
        { name: `${prefix}:tom`, age: 3 },
        { name: `${prefix}:jimmy`, age: 5 },
        { name: `${prefix}:mike` },
      ]);
      // aggr
      const usersStat = await scopeTest.model.user.aggregate({
        aggrs: {
          count: ['*', 'age'],
          sum: ['age'],
          avg: 'age',
          max: 'age',
          min: 'age',
        },
        where: {
        },
      });
      assert.equal(usersStat.count_all, 3);
      assert.equal(usersStat.count_age, 2);
      assert.equal(usersStat.sum_age, 8);
      assert.equal(usersStat.avg_age, 4);
      assert.equal(usersStat.max_age, 5);
      assert.equal(usersStat.min_age, 3);
    });
  });
});
