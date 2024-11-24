// eslint-disable-next-line
import { app, mockUrl, mockModuleInfo, assert } from 'vona-mock';

describe('test/controller/test/feat/middleware.test.js', () => {
  it('action:interception', async () => {
    // ctx
    const ctx = await app.meta.mockUtil.mockCtx();

    // success
    const data = await ctx.meta.util.performAction({
      innerAccess: false,
      method: 'post',
      url: mockUrl('test/feat/middleware/interception', false),
      body: {
        a: '1',
        b: '2',
      },
    });
    assert.equal(data, 3);

    // fail
    await ctx.meta.mockUtil.catchError(
      async function () {
        return await ctx.meta.util.performAction({
          innerAccess: false,
          method: 'post',
          url: mockUrl('test/feat/middleware/interception', false),
          body: {
            // a: '1',
            // b: '2',
          },
        });
      },
      async function (err) {
        assert.equal(err.code, 'test-party:1002');
      },
    );
  });

  it('action:restructuring', async () => {
    // ctx
    const ctx = await app.meta.mockUtil.mockCtx();
    // success
    const data = await ctx.meta.util.performAction({
      innerAccess: false,
      method: 'post',
      url: mockUrl('test/feat/middleware/restructuring', false),
      body: {
        a: '1',
        b: '2',
      },
    });
    assert.equal(data, 3);
  });
});
