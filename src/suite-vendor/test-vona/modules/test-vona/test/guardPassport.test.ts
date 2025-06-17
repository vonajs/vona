import assert from 'node:assert';
import { describe, it } from 'node:test';
import { catchError } from '@cabloy/utils';
import { app } from 'vona-mock';

describe('guardPassport.test.ts', () => {
  it('action:guardPassport:roleName', async () => {
    await app.bean.executor.mockCtx(async () => {
      const jwt = await app.bean.passport.signinMock();
      const res = await app.bean.executor.performAction('get', '/test/vona/guardPassport/testRoleName', {
        innerAccess: false,
        authToken: jwt.accessToken,
      });
      assert.equal(res, undefined);
      const [_, err] = await catchError(() => {
        return app.bean.executor.performAction('get', '/test/vona/guardPassport/testRoleNameFail', {
          innerAccess: false,
          authToken: jwt.accessToken,
        });
      });
      assert.equal(err?.code, 403);
      await app.bean.passport.signout();
    });
  });
});
