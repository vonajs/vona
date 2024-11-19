// eslint-disable-next-line
import { app, mockUrl, mockInfo, assert } from 'egg-born-mock';

describe.only('test/controller/test/feat/summer.test.js', () => {
  it('action:summer', async () => {
    // ctx
    await app.meta.mockUtil.mockRunInAnonymousContextScope(async ctx => {
      await ctx.meta.util.performAction({
        innerAccess: false,
        method: 'post',
        url: mockUrl('test/feat/summer', false),
      });
    });
  });
});
