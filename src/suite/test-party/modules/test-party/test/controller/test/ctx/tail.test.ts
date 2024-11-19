// eslint-disable-next-line
import { app, mockUrl, mockInfo, assert } from 'egg-born-mock';
import { Cast } from 'vona';

describe('test/controller/test/ctx/tail.test.js', () => {
  it('action:tail', async () => {
    // ctx
    await app.meta.mockUtil.mockRunInAnonymousContextScope(async ctx => {
      Cast(ctx.meta)._tail_test_caller = 1;
      await ctx.meta.util.performAction({
        innerAccess: false,
        method: 'post',
        url: mockUrl('test/ctx/tail', false),
      });
    });
  });

  it.only('action:tail:transaction', async () => {
    // ctx
    await app.meta.mockUtil.mockRunInAnonymousContextScope(async ctx => {
      Cast(ctx.meta)._tail_test_caller = 1;
      await Cast(ctx).transaction.begin(async () => {
        await ctx.meta.util.performAction({
          innerAccess: false,
          method: 'post',
          url: mockUrl('test/ctx/tail', false),
        });
      });
    });
  });
});
