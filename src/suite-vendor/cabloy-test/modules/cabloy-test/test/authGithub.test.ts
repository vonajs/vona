import assert from 'node:assert';
import { describe, it } from 'node:test';
import { catchError } from '@cabloy/utils';
import { app } from 'vona-mock';

describe.only('authGithub.test.ts', () => {
  it('action:authGithub', async () => {
    await app.bean.executor.mockCtx(async () => {
      // login
      const jwt = await app.bean.auth.authenticate('a-authgithub:github', {
        // state: { redirect: 'xxxxx' },
        clientName: 'default',
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
    });
  });
});
