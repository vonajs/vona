import { describe, it } from 'node:test';
import { app } from 'vona-mock';

describe('dtoQuery.test.ts', () => {
  it('action:dtoQuery', async () => {
    await app.bean.executor.mockCtx(async () => {
      await app.bean.executor.performAction('get', '/test/vona/post/findMany', {
        query: {
          columns: '*',
          where: {
            stars: {
              _gt_: 12,
            },
          },
          orders: [['createdAt', 'desc']],
          pageNo: 2,
          pageSize: 30,
          title: 'ai',
          userName: 'tom',
        },
      });
    });
  });
});
