// eslint-disable-next-line
import { app, mockUrl, mockInfo, assert } from 'egg-born-mock';

describe('test/controller/test/feat/httpLog.test.js', () => {
  it('action:httpLog', async () => {
    // ctx
    const ctx = await app.meta.mockUtil.mockCtx();
    await ctx.meta.util.performAction({
      innerAccess: false,
      method: 'post',
      url: mockUrl('test/feat/httpLog?name=zhennann', false),
      body: {
        sex: 1,
      },
    });
  });
});
