import { app, mockUrl } from 'vona-mock';

describe.only('status.test.ts', () => {
  it('action:status', async () => {
    await app.meta.mockUtil.mockCtx(async ctx => {
      await ctx.meta.util.performAction({
        method: 'post',
        url: mockUrl('status'),
      });
    });
  });
});
