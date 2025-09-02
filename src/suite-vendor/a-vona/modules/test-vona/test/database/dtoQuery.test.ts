import assert from 'node:assert';
import { describe, it } from 'node:test';
import { isNil } from '@cabloy/utils';
import { app } from 'vona-mock';

describe('dtoQuery.test.ts', () => {
  it('action:dtoQuery', async () => {
    await app.bean.executor.mockCtx(async () => {
      const res = await app.bean.executor.performAction('get', '/test/vona/post/findMany', {
        query: {
          columns: 'id,title', // ['id', 'title'],
          where: {
            stars: {
              _gt_: 12,
            },
          },
          orders: [['testVonaPost.createdAt', 'desc']],
          pageNo: 2,
          pageSize: 30,
          title: 'ai',
          userName: 'tom',
        },
      });
      assert.equal(Array.isArray(res.list), true);
      assert.equal(!isNil(res.total), true);
    });
  });
});
