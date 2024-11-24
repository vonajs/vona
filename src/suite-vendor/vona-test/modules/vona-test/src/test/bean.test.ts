import { app, mockUrl } from 'vona-mock';

describe('bean.test.ts', () => {
  it('action:bean', async () => {
    await app.meta.mockUtil.mockCtx(async ctx => {
      await ctx.meta.util.performAction({
        method: 'get',
        url: mockUrl('bean/test'),
      });
    });
  });

  it('action:service', async () => {
    await app.meta.mockUtil.mockCtx(async ctx => {
      await ctx.meta.util.performAction({
        method: 'get',
        url: mockUrl('bean/service'),
      });
    });
  });
});
