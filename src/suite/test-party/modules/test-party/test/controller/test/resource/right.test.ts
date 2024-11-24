// eslint-disable-next-line
import { app, mockUrl, mockModuleInfo, assert } from 'vona-mock';

describe('test/controller/test/function/right.test.js', () => {
  it('action:checkRightResourceUser', async () => {
    // ctx
    const ctx = await app.meta.mockUtil.mockCtx();

    const checkRightResources = [
      ['Root', true],
      ['Tomson', true],
    ];
    for (const [userName, right] of checkRightResources) {
      // login
      await ctx.meta.mockUtil.login({ auth: userName });
      // checkRightResourceUser
      let data;
      try {
        data = await ctx.meta.util.performAction({
          innerAccess: false,
          method: 'post',
          url: mockUrl('test/resource/checkRightResourceUser', false),
        });
      } catch (err) {
        assert.equal(right, false);
        assert.equal(err.code, 403);
      }
      if (data) {
        assert.equal(right, true);
        assert.equal(data.atomId > 0, true);
      }
    }
  });
});
