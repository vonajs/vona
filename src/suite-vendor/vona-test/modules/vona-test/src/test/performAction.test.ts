import { app, mockUrl, assert } from 'vona-mock';

describe('performAction.test.js', () => {
  it('action:performAction', async () => {
    const result = await app.meta.mockUtil.mockCtx(async ctx => {
      return await ctx.meta.util.performAction<{ id: number; url: string }>({
        method: 'post',
        url: mockUrl('performAction/echo'),
        body: {
          id: 123,
        },
      });
    });
    assert.equal(result.id, 123);
    assert.equal(result.url, mockUrl('performAction/echo'));
  });
});
