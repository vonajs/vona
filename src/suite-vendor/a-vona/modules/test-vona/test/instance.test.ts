import assert from 'node:assert';
import { describe, it } from 'node:test';
import { app } from 'vona-mock';

describe('instance.test.ts', () => {
  it('action:instance:singleTest', async () => {
    await app.bean.executor.mockCtx(async () => {
      const scopeDatabase = app.bean.scope('a-orm');
      const defaultClientName = scopeDatabase.service.database.getDefaultClientName();
      assert.equal(app.ctx.instanceName, 'singleTest');
      assert.equal(app.ctx.instance.name, 'singleTest');
      assert.equal(app.bean.database.current.clientName, defaultClientName);
      assert.equal(['pg', 'mysql'].includes(app.bean.database.current.clientName), true);
    }, { instanceName: 'singleTest' as any });
  });
  it('action:instance:isolateTest', async () => {
    await app.bean.executor.mockCtx(async () => {
      const scopeDatabase = app.bean.scope('a-orm');
      const defaultClientName = scopeDatabase.service.database.getDefaultClientName();
      assert.equal(app.ctx.instanceName, 'isolateTest');
      assert.equal(app.ctx.instance.name, 'isolateTest');
      assert.equal(app.bean.database.current.clientName, defaultClientName);
      assert.equal(app.bean.database.current.clientName, 'isolateTest');
    }, { instanceName: 'isolateTest' as any });
  });
});
