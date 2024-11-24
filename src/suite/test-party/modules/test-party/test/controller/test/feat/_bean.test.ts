import { app, mockUrl } from 'vona-mock';

describe('test/controller/test/feat/bean.test.js', () => {
  it('action:bean', async () => {
    // ctx
    await app.meta.mockUtil.mockCtx(async ctx => {
      await ctx.meta.util.performAction({
        innerAccess: false,
        method: 'get',
        url: mockUrl('test/feat/beanTest'),
      });
    });
  });

  it('action:service', async () => {
    // ctx
    await app.meta.mockUtil.mockCtx(async ctx => {
      await ctx.meta.util.performAction({
        innerAccess: false,
        method: 'get',
        url: mockUrl('test/feat/bean/serviceTest'),
      });
    });
  });
});
