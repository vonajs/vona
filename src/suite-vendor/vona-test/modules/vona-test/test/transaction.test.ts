import assert from 'assert';
import { app } from 'vona-mock';

describe('transaction.test.ts', () => {
  const tableName = '__tempTransaction';

  it('action:transaction:fail', async () => {
    await app.bean.executor.mockCtx(async () => {
      // create table
      await app.bean.model.createTable(tableName, function (table) {
        table.basicFields();
        table.string('name');
      });
      // create a new item
      const res = await app.bean.model.insert(tableName, {
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
      const item = await app.bean.model.get(tableName, {
        id,
      });
      assert.notEqual(item.name, itemNew.name);

      // drop table
      await app.bean.model.dropTable(tableName);
    });
  });

  it('action:transaction:success', async () => {
    await app.bean.executor.mockCtx(async () => {
      // create table
      await app.bean.model.createTable(tableName, function (table) {
        table.basicFields();
        table.string('name');
      });
      // create a new item
      const res = await app.bean.model.insert(tableName, {
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
      const item = await app.bean.model.get(tableName, {
        id,
      });
      assert.equal(item.name, itemNew.name);

      // drop table
      await app.bean.model.dropTable(tableName);
    });
  });
});
