// eslint-disable-next-line
import { app, mockUrl, mockInfo, assert } from 'egg-born-mock';

describe.only('test/controller/test/db/client.test.js', () => {
  it('action:client', async () => {
    // ctx
    const ctx = await app.meta.mockUtil.mockCtx();
    // client
    const clientDefault = ctx.app.bean.scope('a-db').local.client;
    const clientDefault2 = ctx.app.bean.database.get();
    const clientDefault3 = ctx.app.bean.database.get();
    assert.equal(clientDefault.knex === clientDefault2, true);
    assert.equal(clientDefault.knex === clientDefault3, true);
  });
});
