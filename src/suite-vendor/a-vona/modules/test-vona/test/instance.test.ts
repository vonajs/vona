import assert from 'node:assert';
import { describe, it } from 'node:test';
import { app } from 'vona-mock';

describe('instance.test.ts', () => {
  it('action:instance:singleTest', async () => {
    await app.bean.executor.mockCtx(async () => {
      assert.equal(app.ctx.instanceName, 'singleTest');
      assert.equal(app.ctx.instance.name, 'singleTest');
    }, { instanceName: 'singleTest' as any });
  });
  it('action:instance:isolateTest', async () => {
    await app.bean.executor.mockCtx(async () => {
      assert.equal(app.ctx.instanceName, 'isolateTest');
      assert.equal(app.ctx.instance.name, 'isolateTest');
    }, { instanceName: 'isolateTest' as any });
  });
});
