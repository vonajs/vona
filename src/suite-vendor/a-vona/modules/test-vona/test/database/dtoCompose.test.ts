import assert from 'node:assert';
import { describe, it } from 'node:test';
import { app } from 'vona-mock';

describe('dtoCompose.test.ts', () => {
  it('action:dtoCompose', async () => {
    await app.bean.executor.mockCtx(async () => {
      assert.equal(app.ctx.instanceName, '');
    });
  });
});
