import { describe, it } from 'node:test';
import { app } from 'vona-mock';

describe.only('dtoQuery.test.ts', () => {
  it('action:dtoQuery', async () => {
    await app.bean.executor.mockCtx(async () => {
      await app.bean.executor.performAction('get', '/test/vona/post/findMany', {
        query: {
          where: {
            stars: {
              __get__: 12,
            },
          },
          title: 'ai',
        },
      });
    });
  });
});
