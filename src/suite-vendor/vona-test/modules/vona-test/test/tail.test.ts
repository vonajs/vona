import { app, mockUrl } from 'vona-mock';
import { cast } from 'vona';

describe.only('tail.test.ts', () => {
  it('action:tail', async () => {
    await app.meta.mockUtil.mockCtx(async ctx => {
      cast(ctx.meta)._tail_test_caller = 1;
      await ctx.meta.util.performAction({
        method: 'post',
        url: mockUrl('tail'),
      });
    });
  });

  it('action:tail:transaction', async () => {
    await app.meta.mockUtil.mockCtx(async ctx => {
      cast(ctx.meta)._tail_test_als_caller = 1;
      await cast(ctx).transaction.begin(async () => {
        await ctx.meta.util.performAction({
          method: 'post',
          url: mockUrl('tail'),
        });
      });
    });
  });
});
