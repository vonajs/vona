import assert from 'node:assert';
import { describe, it } from 'node:test';
import { catchError } from '@cabloy/utils';
import { app } from 'vona-mock';

describe('jwt.test.ts', () => {
  it('action:jwt', async () => {
    await app.bean.executor.mockCtx(async () => {
      // login
      const jwt = await app.bean.executor.performAction('post', '/vona/test/jwt/login', {
        body: {
          name: 'admin',
        },
      });
      assert.equal(!!jwt?.accessToken, true);
      // isAuthenticated
      let isAuthenticated = await app.bean.executor.performAction('get', '/vona/test/jwt/isAuthenticated');
      assert.equal(isAuthenticated, true);
      // isAuthenticated: isolate
      const [isAuthenticated2, _err] = await catchError(async () => {
        return await app.bean.executor.newCtxIsolate(async () => {
          return await app.bean.executor.performAction('get', '/vona/test/jwt/isAuthenticated');
        });
      });
      assert.equal(isAuthenticated2, undefined);
      // isAuthenticated: isolate + header
      isAuthenticated = await app.bean.executor.newCtxIsolate(async () => {
        return await app.bean.executor.performAction('get', '/vona/test/jwt/isAuthenticated', { authToken: jwt.accessToken });
      });
      assert.equal(isAuthenticated, true);
      // refresh
      
    });
  });
});
