import assert from 'node:assert';
import { describe, it } from 'node:test';
import { app } from 'vona-mock';

describe('transaction.test.ts', () => {
  const tableNameFail = '__tempTransactionFail';
  const tableNameSuccess = '__tempTransactionSuccess';

  it('action:transaction:fail', async () => {
    await app.bean.executor.mockCtx(async () => {
      // create table
      await app.bean.model.createTable(tableNameFail, table => {
        table.basicFields();
        table.string('name');
      });
      // create a new item
      const res = await app.bean.model.insert(tableNameFail, {
        name: 'hello',
      });
      const id = res[0];

      // try to change name
      const itemNew = {
        id,
        name: 'hello!!',
      };
      try {
        await app.bean.executor.performAction('post', '/vona/test/transaction/fail', {
          body: itemNew,
        });
      } catch (_err) {}

      // check name
      const item = await app.bean.model.get(tableNameFail, {
        id,
      });
      assert.notEqual(item.name, itemNew.name);

      // drop table
      await app.bean.model.dropTable(tableNameFail);
    });
  });

  it('action:transaction:success', async () => {
    await app.bean.executor.mockCtx(async () => {
      // create table
      await app.bean.model.createTable(tableNameSuccess, table => {
        table.basicFields();
        table.string('name');
      });
      // create a new item
      const res = await app.bean.model.insert(tableNameSuccess, {
        name: 'hello',
      });
      const id = res[0];

      // try to change name
      const itemNew = {
        id,
        name: 'hello!!',
      };
      await app.bean.executor.performAction('post', '/vona/test/transaction/success', {
        body: itemNew,
      });

      // check name
      const item = await app.bean.model.get(tableNameSuccess, {
        id,
      });
      assert.equal(item.name, itemNew.name);

      // drop table
      await app.bean.model.dropTable(tableNameSuccess);
    });
  });
});
