import { app, mockUrl } from 'vona-mock';
import { Cast } from 'vona';

describe('test/controller/test/ctx/tail.test.js', () => {
  it('action:tail', async () => {
    // ctx
    await app.meta.mockUtil.mockCtx(async ctx => {
      Cast(ctx.meta)._tail_test_caller = 1;
      await ctx.meta.util.performAction({
        innerAccess: false,
        method: 'post',
        url: mockUrl('test/ctx/tail'),
      });
    });
  });

  it('action:tail:transaction', async () => {
    // ctx
    await app.meta.mockUtil.mockCtx(async ctx => {
      Cast(ctx.meta)._tail_test_als_caller = 1;
      await Cast(ctx).transaction.begin(async () => {
        await ctx.meta.util.performAction({
          innerAccess: false,
          method: 'post',
          url: mockUrl('test/ctx/tail'),
        });
      });
    });
  });
});
