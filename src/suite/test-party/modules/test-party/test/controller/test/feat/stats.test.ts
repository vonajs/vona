// eslint-disable-next-line
import { app, mockUrl, mockModuleInfo, assert } from 'vona-mock';

describe('test/controller/test/feat/stats.test.js', () => {
  it('action:stats', async () => {
    // ctx
    const ctx = await app.meta.mockUtil.mockCtx();
    await ctx.app.bean.executor.performAction({
      innerAccess: false,
      method: 'post',
      url: mockUrl('test/feat/stats', false),
    });
  });
});
