import assert from 'node:assert';
import { describe, it } from 'node:test';
import { app } from 'vona-mock';

describe('modelRelationsCud.test.ts', () => {
  it('action:modelRelationsCud', async () => {
    await app.bean.executor.mockCtx(async () => {
      assert.equal(app.ctx.instanceName, '');
    });
  });
});
