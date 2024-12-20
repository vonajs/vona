import { app } from 'vona-mock';
import { cast } from 'vona';

describe('tail.test.ts', () => {
  it('action:tail', async () => {
    await app.bean.executor.mockCtx(async () => {
      cast(app.ctx.meta)._tail_test_caller = 1;
      await app.bean.executor.performAction('post', '/vona/test/tail');
    });
  });

  it('action:tail:transaction', async () => {
    await app.bean.executor.mockCtx(async () => {
      cast(app.ctx.meta)._tail_test_als_caller = 1;
      await cast(app.ctx).transaction.begin(async () => {
        await app.bean.executor.performAction('post', '/vona/test/tail');
      });
    });
  });
});
