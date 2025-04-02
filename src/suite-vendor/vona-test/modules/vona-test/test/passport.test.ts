import assert from 'node:assert';
import { describe, it } from 'node:test';
import { catchError } from '@cabloy/utils';
import { app } from 'vona-mock';

describe('passport.test.ts', () => {
  it('action:passport:simple', async () => {
    await app.bean.executor.mockCtx(async () => {
      await app.bean.passport.signinMock();
      assert.equal(app.bean.passport.isAuthenticated, true);
      await app.bean.executor.performAction('get', '/vona/test/passport/echo/admin');
      await app.bean.passport.signout();
      assert.equal(app.bean.passport.isAuthenticated, false);
    });
  });

  it('action:passport:full', async () => {
    await app.bean.executor.mockCtx(async () => {
      // login
      const jwt = await app.bean.executor.performAction('post', '/vona/test/passport/login', {
        body: {
          name: 'admin',
        },
      });
      assert.equal(!!jwt?.accessToken, true);
      // isAuthenticated
      let isAuthenticated = await app.bean.executor.performAction('get', '/vona/test/passport/isAuthenticated');
      assert.equal(isAuthenticated, true);
      // isAuthenticated: isolate
      const [isAuthenticated2, _err] = await catchError(async () => {
        return await app.bean.executor.newCtxIsolate(async () => {
          return await app.bean.executor.performAction('get', '/vona/test/passport/isAuthenticated');
        });
      });
      assert.equal(isAuthenticated2, undefined);
      // isAuthenticated: isolate + header
      isAuthenticated = await app.bean.executor.newCtxIsolate(async () => {
        return await app.bean.executor.performAction('get', '/vona/test/passport/isAuthenticated', { authToken: jwt.accessToken });
      });
      assert.equal(isAuthenticated, true);
      // refresh
      const jwtNew = await app.bean.executor.performAction('post', '/vona/test/passport/refresh', {
        body: {
          refreshToken: jwt.refreshToken,
        },
      });
      assert.notEqual(jwt?.accessToken, jwtNew.accessToken);
      // logout
      await app.bean.executor.performAction('post', '/vona/test/passport/logout');
      // isAuthenticated: isolate + header
      const [isAuthenticated3] = await catchError(async () => {
        return await app.bean.executor.performAction('get', '/vona/test/passport/isAuthenticated');
      });
      assert.equal(isAuthenticated3, undefined);
    });
  });
});
