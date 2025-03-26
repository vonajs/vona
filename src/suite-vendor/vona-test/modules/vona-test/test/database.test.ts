import assert from 'node:assert';
import { describe, it } from 'node:test';
import { app } from 'vona-mock';

describe('database.test.ts', () => {
  it('action:dataSource:switch', async () => {
    await app.bean.executor.mockCtx(async () => {
      // current
      assert.equal(app.ctx.dbMeta.currentClientName, app.config.database.defaultClient);
      // switch
      const clientNames = Object.keys(app.config.database.clients);
      const clientName2 = clientNames.find(item => item !== app.config.database.defaultClient);
      await app.bean.dataSource.switch(async () => {
        assert.equal(app.ctx.dbMeta.currentClientName, clientName2);
      }, { clientName: clientName2 as any });
      // restore
      assert.equal(app.ctx.dbMeta.currentClientName, app.config.database.defaultClient);
    });
  });
});
