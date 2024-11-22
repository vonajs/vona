// eslint-disable-next-line
import { app, mockUrl, mockModuleInfo, assert } from 'egg-born-mock';

describe('test/controller/test/db/client.test.js', () => {
  it('action:client', async () => {
    // ctx
    const ctx = await app.meta.mockUtil.mockCtx();
    // client
    const clientDefault = ctx.app.bean.databaseClient;
    const clientDefault2 = ctx.app.bean.database.get();
    const clientDefault3 = ctx.app.bean.database.get();
    assert.equal(clientDefault.db === clientDefault2, true);
    assert.equal(clientDefault.db === clientDefault3, true);
  });
});
