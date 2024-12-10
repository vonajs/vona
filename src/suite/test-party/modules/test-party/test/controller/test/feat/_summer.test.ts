import { app, mockUrl } from 'vona-mock';

describe('test/controller/test/feat/summer.test.js', () => {
  it('action:summer', async () => {
    // ctx
    await app.meta.mockUtil.mockCtx(async ctx => {
      await ctx.app.bean.executor.performAction({
        innerAccess: false,
        method: 'post',
        url: mockUrl('test/feat/summer'),
      });
    });
  });
});
