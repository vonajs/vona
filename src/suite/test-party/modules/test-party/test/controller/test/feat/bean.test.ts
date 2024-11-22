// eslint-disable-next-line
import { app, mockUrl, mockInfo, assert } from 'egg-born-mock';

describe.only('test/controller/test/feat/bean.test.js', () => {
  it('action:bean', async () => {
    // ctx
    await app.meta.mockUtil.mockCtx(async ctx => {
      await ctx.meta.util.performAction({
        innerAccess: false,
        method: 'get',
        url: mockUrl('test/feat/beanTest', false),
      });
    });
  });

  it('action:service', async () => {
    // ctx
    await app.meta.mockUtil.mockCtx(async ctx => {
      await ctx.meta.util.performAction({
        innerAccess: false,
        method: 'get',
        url: mockUrl('test/feat/bean/serviceTest', false),
      });
    });
  });
});
