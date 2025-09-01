import { describe, it } from 'node:test';
import { app } from 'vona-mock';

describe('dtoQuery.test.ts', () => {
  it('action:dtoQuery', async () => {
    await app.bean.executor.mockCtx(async () => {
      await app.bean.executor.performAction('get', '/test/vona/post/findMany', {
        query: {
          title: 'ai',
        },
      });
    });
  });
});
