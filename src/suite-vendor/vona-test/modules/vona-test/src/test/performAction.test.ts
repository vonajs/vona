import { app, mockUrl, assert } from 'egg-born-mock';

describe.only('test/controller/test/ctx/performAction.test.js', () => {
  it('action:performAction', async () => {
    const result = await app.meta.mockUtil.mockCtx(async ctx => {
      return await ctx.meta.util.performAction<number>({
        method: 'post',
        url: mockUrl('performAction/echo'),
        body: {
          id: 123,
        },
      });
    });
    assert.equal(result, 123);
  });
});
