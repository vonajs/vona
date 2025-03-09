import assert from 'node:assert';
import { describe, it } from 'node:test';
import { app } from 'vona-mock';

describe('jwt.test.ts', () => {
  it('action:jwt', async () => {
    await app.bean.executor.mockCtx(async () => {
      const jwt = await app.bean.executor.performAction('post', '/vona/test/jwt/login', {
        body: {
          name: 'admin',
        },
      });
      assert.equal(!!jwt?.accessToken, true);
      const isAuthenticated = await app.bean.executor.performAction('get', '/vona/test/jwt/isAuthenticated');
      assert.equal(isAuthenticated, true);
    });
  });
});
