import { app, mockUrl } from 'vona-mock';
import { cast } from 'vona';

describe('test/controller/test/ctx/tail.test.js', () => {
  it('action:tail', async () => {
    // ctx
    await app.meta.mockUtil.mockCtx(async ctx => {
      cast(ctx.meta)._tail_test_caller = 1;
      await ctx.app.bean.executor.performAction({
        innerAccess: false,
        method: 'post',
        url: mockUrl('test/ctx/tail'),
      });
    });
  });

  it('action:tail:transaction', async () => {
    // ctx
    await app.meta.mockUtil.mockCtx(async ctx => {
      cast(ctx.meta)._tail_test_als_caller = 1;
      await cast(ctx).transaction.begin(async () => {
        await ctx.app.bean.executor.performActionrmAction({
          innerAccess: false,
          method: 'post',
          url: mockUrl('test/ctx/tail'),
        });
      });
    });
  });
});
