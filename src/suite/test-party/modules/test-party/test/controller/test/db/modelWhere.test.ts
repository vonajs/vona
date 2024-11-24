// eslint-disable-next-line
import { app, mockUrl, mockModuleInfo, assert } from 'vona-mock';

describe('test/controller/test/feat/modelWhere.test.js', () => {
  it('action:modelWhere', async () => {
    // ctx
    const ctx = await app.meta.mockUtil.mockCtx();
    await ctx.meta.util.performAction({
      innerAccess: false,
      method: 'get',
      url: mockUrl('test/feat/modelWhere', false),
    });
  });
});
