import { app, mockUrl } from 'vona-mock';

describe.only('queue.test.js', () => {
  it('action:queue', async () => {
    await app.meta.mockUtil.mockCtx(async ctx => {
      await ctx.meta.util.performAction({
        method: 'post',
        url: mockUrl('queue/pushAsync'),
      });
      await ctx.meta.util.performAction({
        method: 'post',
        url: mockUrl('queue/push'),
      });
    });
  });
});
