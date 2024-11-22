import { app, mockPath } from 'egg-born-mock';

describe.only('test/controller/test/feat/summer.test.js', () => {
  it('action:summer', async () => {
    // ctx
    await app.meta.mockUtil.mockCtx(async ctx => {
      await ctx.meta.util.performAction({
        innerAccess: false,
        method: 'post',
        url: mockPath('test/feat/summer', false),
      });
    });
  });
});
