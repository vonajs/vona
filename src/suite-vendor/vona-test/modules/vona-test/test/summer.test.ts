import { app, mockUrl } from 'vona-mock';

describe.only('summer.test.ts', () => {
  it('action:summer', async () => {
    await app.meta.mockUtil.mockCtx(async ctx => {
      await ctx.meta.util.performAction({
        method: 'post',
        url: mockUrl('summer'),
      });
    });
  });
});
