import assert from 'assert';
import { app } from 'vona-mock';

describe('passport.test.ts', () => {
  it('action:passport', async () => {
    await app.bean.executor.mockCtx(async () => {
      await app.bean.passport.signinMock();
      assert.equal(app.bean.passport.isAuthenticated, true);
      await app.bean.passport.signout();
      assert.equal(app.bean.passport.isAuthenticated, false);
      await app.bean.executor.performAction('get', '/vona/test/passport/echo/admin');
    });
  });
});
