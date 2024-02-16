// eslint-disable-next-line
import { app, mockUrl, mockInfo, assert } from 'egg-born-mock';

describe('test/controller/test/atom/starLabel.test.js', () => {
  it('action:starLabel', async () => {
    // ctx
    const ctx = await app.meta.mockUtil.mockCtx();

    // login
    await ctx.meta.mockUtil.login({ auth: 'Tom' });

    // do
    await ctx.meta.util.performAction({
      innerAccess: false,
      method: 'post',
      url: mockUrl('test/atom/starLabel', false),
    });
  });
});
