// import assert from 'node:assert';
import { describe, it } from 'node:test';
import { app } from 'vona-mock';

describe.only('authSimple.test.ts.test.ts', () => {
  it('action:authSimple.test.ts', async () => {
    await app.bean.executor.mockCtx(async () => {
      await app.bean.auth.authenticate('a-authsimple:simple', {});
    });
  });
});
