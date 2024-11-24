import { app, mockUrl } from 'egg-born-mock';
import { Cast } from 'vona';

describe('tail.test.ts', () => {
  it('action:tail', async () => {
    await app.meta.mockUtil.mockCtx(async ctx => {
      Cast(ctx.meta)._tail_test_caller = 1;
      await ctx.meta.util.performAction({
        method: 'post',
        url: mockUrl('tail'),
      });
    });
  });

  it('action:tail:transaction', async () => {
    await app.meta.mockUtil.mockCtx(async ctx => {
      Cast(ctx.meta)._tail_test_als_caller = 1;
      await Cast(ctx).transaction.begin(async () => {
        await ctx.meta.util.performAction({
          method: 'post',
          url: mockUrl('tail'),
        });
      });
    });
  });
});
