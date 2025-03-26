import { describe, it } from 'node:test';
import { cast } from 'vona';
import { app } from 'vona-mock';

describe('tail.test.ts', () => {
  it('action:tail', async () => {
    await app.bean.executor.mockCtx(async () => {
      cast(app.ctx)._tail_test_caller = 1;
      await app.bean.executor.performAction('post', '/vona/test/tail');
    });
  });

  it('action:tail:transaction', async () => {
    await app.bean.executor.mockCtx(async () => {
      cast(app.ctx)._tail_test_als_caller = 1;
      await app.ctx.dbMeta.transaction.begin(async () => {
        await app.bean.executor.performAction('post', '/vona/test/tail');
      });
    });
  });
});
