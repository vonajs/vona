import assert from 'node:assert';
import { describe, it } from 'node:test';
import { catchError } from '@cabloy/utils';
import { app } from 'vona-mock';

describe('authSimple.test.ts.test.ts', () => {
  it('action:passwordHash', async () => {
    const scope = app.bean.scope('a-authsimple');
    const password = '12344##1xxaasDFQ,.$';
    const hash = await scope.service.authSimple.calcPasswordHash(password);
    let verified = await scope.service.authSimple.verifyPasswordHash(password, hash);
    assert.equal(verified, true);
    verified = await scope.service.authSimple.verifyPasswordHash(`${password}failed`, hash);
    assert.equal(verified, false);
  });

  it('action:authSimple.test.ts', async () => {
    await app.bean.executor.mockCtx(async () => {
      // login
      const jwt = await app.bean.auth.authenticate('a-authsimple:simple', {
        clientName: 'default',
        clientOptions: { username: 'admin', password: '123456' },
      });
      assert.equal(!!jwt?.accessToken, true);
      // isAuthenticated: isolate
      const [isAuthenticated2, _err] = await catchError(async () => {
        return await app.bean.executor.newCtxIsolate(async () => {
          return await app.bean.executor.performAction('get', '/cabloy/test/passport/isAuthenticated');
        });
      });
      assert.equal(isAuthenticated2, undefined);
      // isAuthenticated: isolate + header
      const isAuthenticated = await app.bean.executor.newCtxIsolate(async () => {
        return await app.bean.executor.performAction('get', '/vona/test/passport/isAuthenticated', { authToken: jwt.accessToken });
      });
      assert.equal(isAuthenticated, true);
      // login again
      const jwt2 = await app.bean.authSimple.authenticate(
        { username: 'admin', password: '123456' },
        'default',
      );
      assert.equal(!!jwt2?.accessToken, true);
    });
  });
});
