// eslint-disable-next-line
import { app, mockUrl, mockModuleInfo, assert } from 'vona-mock';

describe('test/controller/test/feat/httpLog.test.js', () => {
  it('action:httpLog', async () => {
    // ctx
    const ctx = await app.meta.mockUtil.mockCtx();
    await ctx.app.bean.executor.performAction({
      innerAccess: false,
      method: 'post',
      url: mockUrl('test/feat/httpLog?name=zhennann', false),
      body: {
        sex: 1,
      },
    });
  });
});
