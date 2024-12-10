// eslint-disable-next-line
import { app, mockUrl, mockModuleInfo, assert } from 'vona-mock';

describe('test/controller/test/atom/all.test.js', () => {
  it('action:all', async () => {
    // ctx
    const ctx = await app.meta.mockUtil.mockCtx();
    await ctx.app.bean.executor.performAction({
      innerAccess: false,
      method: 'get',
      url: mockUrl('test/atom/all', false),
    });
  });
});
