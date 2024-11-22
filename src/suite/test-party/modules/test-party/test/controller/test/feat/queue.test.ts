// eslint-disable-next-line
import { app, mockUrl, mockModuleInfo, assert } from 'egg-born-mock';

describe('test/controller/test/feat/queue.test.js', () => {
  it('action:queue', async () => {
    // ctx
    const ctx = await app.meta.mockUtil.mockCtx();

    await ctx.meta.util.performAction({
      innerAccess: false,
      method: 'post',
      url: mockUrl('test/feat/pushAsync', false),
    });

    await ctx.meta.util.performAction({
      innerAccess: false,
      method: 'post',
      url: mockUrl('test/feat/push', false),
    });
  });
});
