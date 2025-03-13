import assert from 'node:assert';
import { describe, it } from 'node:test';
import { app } from 'vona-mock';

describe.only('authSimple.test.ts.test.ts', () => {
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
      const res = await app.bean.auth.authenticate('a-authsimple:simple', {
        clientName: 'default',
        clientOptions: { username: 'admin', password: '123456' },
      });
      console.log('------------auth simple authenticate', res);
      const res2 = await app.bean.authSimple.authenticate(
        { username: 'admin', password: '123456' },
        'default',
      );
      console.log('------------auth simple authenticate', res2);
    });
  });
});
