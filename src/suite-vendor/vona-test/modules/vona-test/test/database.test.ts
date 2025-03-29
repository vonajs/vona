import assert from 'node:assert';
import { describe, it } from 'node:test';
import { catchError } from '@cabloy/utils';
import { app } from 'vona-mock';

describe('database.test.ts', () => {
  it('action:database:switchClient', async () => {
    await app.bean.executor.mockCtx(async () => {
      // current
      assert.equal(app.ctx.dbMeta.currentClientName, app.config.database.defaultClient);
      // switch
      const clientNames = Object.keys(app.config.database.clients);
      const clientName2 = clientNames.find(item => item !== app.config.database.defaultClient);
      await app.bean.database.switchClient(async () => {
        assert.equal(app.ctx.dbMeta.currentClientName, clientName2);
      }, { clientName: clientName2 as any });
      // restore
      assert.equal(app.ctx.dbMeta.currentClientName, app.config.database.defaultClient);
    });
  });
  it('action:model:clientName', async () => {
    await app.bean.executor.mockCtx(async () => {
      // scope
      const scopeTest = app.bean.scope('vona-test');
      const modelTest = scopeTest.model.test;
      assert.equal(modelTest.options.clientName, 'default');
      const modelTest2 = scopeTest.model.test;
      assert.equal(modelTest, modelTest2);
    });
  });
  it('action:model:clientNameDynamic:transaction:fail', async () => {
    await app.bean.executor.mockCtx(async () => {
      // scope
      const scopeTest = app.bean.scope('vona-test');
      const entityTest = await scopeTest.model.test.insert({ title: 'clientNameDynamic:fail' });
      assert.equal(entityTest.title, 'clientNameDynamic:fail');
      await catchError(async () => {
        const dbMeta = app.bean.database.createDbMeta('default');
        await dbMeta.transaction.begin(async () => {
          const modelTest = scopeTest.model.test.newInstance(dbMeta);
          assert.equal(modelTest.options.clientName, 'default');
          await modelTest.update({ id: entityTest.id, title: 'clientNameDynamic:fail_1' });
          throw new Error('rollback');
        });
      });
      const entityTest2 = await scopeTest.model.test.get({ id: entityTest.id });
      assert.equal(entityTest2?.title, 'clientNameDynamic:fail');
      // delete
      await scopeTest.model.test.delete({ id: entityTest.id });
    });
  });
  it('action:model:clientNameDynamic:transaction:success', async () => {
    await app.bean.executor.mockCtx(async () => {
      // scope
      const scopeTest = app.bean.scope('vona-test');
      const entityTest = await scopeTest.model.test.insert({ title: 'clientNameDynamic:success' });
      assert.equal(entityTest.title, 'clientNameDynamic:success');
      const dbMeta = app.bean.database.createDbMeta('default');
      await dbMeta.transaction.begin(async () => {
        const modelTest = scopeTest.model.test.newInstance(dbMeta);
        assert.equal(modelTest.options.clientName, 'default');
        await modelTest.update({ id: entityTest.id, title: 'clientNameDynamic:success_1' });
      });
      const entityTest2 = await scopeTest.model.test.get({ id: entityTest.id });
      assert.equal(entityTest2?.title, 'clientNameDynamic:success_1');
      // delete
      await scopeTest.model.test.delete({ id: entityTest.id });
    });
  });
  it('action:database:transaction:compensate', async () => {
    await app.bean.executor.mockCtx(async () => {
      // scope
      const scopeTest = app.bean.scope('vona-test');
      const entityTest = await scopeTest.model.test.insert({ title: 'transaction:compensate:fail' });
      assert.equal(entityTest.title, 'transaction:compensate:fail');
      await catchError(async () => {
        const dbMeta = app.bean.database.createDbMeta('default');
        await dbMeta.transaction.begin(async () => {
          const modelTest = scopeTest.model.test.newInstance(dbMeta);
          assert.equal(modelTest.options.clientName, 'default');
          await modelTest.update({ id: entityTest.id, title: 'transaction:compensate:fail_1' });
          // let cache take effect
          await modelTest.get({ id: entityTest.id });
          throw new Error('rollback');
        });
      });
      const entityTest2 = await scopeTest.model.test.get({ id: entityTest.id });
      assert.equal(entityTest2?.title, 'transaction:compensate:fail');
      // delete
      await scopeTest.model.test.delete({ id: entityTest.id });
    });
  });
});
