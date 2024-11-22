// eslint-disable-next-line
import { app, mockUrl, mockModuleInfo, assert } from 'egg-born-mock';

describe('test/controller/test/cache/db.test.js', () => {
  it('action:cache:db', async () => {
    // ctx
    const ctx = await app.meta.mockUtil.mockCtx();
    await ctx.meta.util.performAction({
      innerAccess: false,
      method: 'post',
      url: mockUrl('test/cache/db', false),
    });
  });
});
