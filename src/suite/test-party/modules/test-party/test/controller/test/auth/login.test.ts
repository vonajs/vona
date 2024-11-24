// eslint-disable-next-line
import { app, mockUrl, mockModuleInfo, assert } from 'vona-mock';

describe('test/controller/test/auth/login.test.js', () => {
  it('action:auth:login', async () => {
    // ctx
    const ctx = await app.meta.mockUtil.mockCtx();

    // login
    const users = [
      ['root', true],
      ['Tom', true],
      ['zhennann', false],
    ];

    for (const [userName, success] of users) {
      try {
        await ctx.meta.mockUtil.login({ auth: userName });
        assert.equal(success, true, userName);
      } catch (err) {
        assert.equal(success, false, userName);
      }
    }
  });
});
