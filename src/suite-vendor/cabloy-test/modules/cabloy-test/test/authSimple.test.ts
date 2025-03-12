// import assert from 'node:assert';
import { describe, it } from 'node:test';
import { app } from 'vona-mock';

describe.only('authSimple.test.ts.test.ts', () => {
  it('action:authSimple.test.ts', async () => {
    await app.bean.executor.mockCtx(async () => {
      const res = await app.bean.auth.authenticate('a-authsimple:simple', {
        clientName: 'default',
        clientOptions: { username: 'admin', password: '123456' },
      });
      console.log('------------auth simple authenticate', res);
    });
  });
});
