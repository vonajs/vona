// eslint-disable-next-line
import { app, mockUrl, mockModuleInfo, assert } from 'vona-mock';

describe('test/controller/test/feat/fieldsRight.test.js', () => {
  it('action:fieldsRight:parseSchema', async () => {
    // ctx
    const ctx = await app.meta.mockUtil.mockCtx();
    await ctx.meta.util.performAction({
      innerAccess: false,
      method: 'post',
      url: mockUrl('test/feat/fieldsRight/parseSchema', false),
    });
  });
});
