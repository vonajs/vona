// eslint-disable-next-line
import { app, mockUrl, mockInfo, assert } from 'egg-born-mock';

describe('test/controller/test/ctx/session.test.js', () => {
  it('action:session', async () => {
    // ctx
    const ctx = await app.meta.mockUtil.mockCtx();

    // anonymous
    await ctx.meta.util.performAction({
      innerAccess: false,
      method: 'post',
      url: mockUrl('test/ctx/session', false),
    });

    // login
    await ctx.meta.mockUtil.login({ auth: 'root' });
    await ctx.meta.mockUtil.logout();

    // test again
    await ctx.meta.util.performAction({
      innerAccess: false,
      method: 'post',
      url: mockUrl('test/ctx/session', false),
    });
  });
});
