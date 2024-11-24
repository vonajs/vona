// eslint-disable-next-line
import { app, mockUrl, mockModuleInfo, assert } from 'vona-mock';

describe('test/controller/test/itemOnly/all.test.js', () => {
  it('action:atomOnly-all', async () => {
    // ctx
    const ctx = await app.meta.mockUtil.mockCtx();
    await ctx.meta.util.performAction({
      innerAccess: false,
      method: 'get',
      url: mockUrl('test/itemOnly/all', false),
    });
  });
});
