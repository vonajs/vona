import assert from 'node:assert';
import { describe, it } from 'node:test';
import { app } from 'vona-mock';

describe('upload.test.ts', () => {
  it('action:upload', async () => {
    await app.bean.executor.mockCtx(async () => {
      assert.equal(app.ctx.instanceName, '');
    });
  });
});
