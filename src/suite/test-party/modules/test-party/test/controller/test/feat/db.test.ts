// eslint-disable-next-line
import { app, mockUrl, mockInfo, assert } from 'egg-born-mock';

describe('test/controller/test/feat/db.test.js', () => {
  it('action:db', async () => {
    // ctx
    const ctx = await app.meta.mockUtil.mockCtx();

    // iid
    const iid = await ctx.meta.util.performAction({
      innerAccess: false,
      method: 'post',
      url: mockUrl('/a/base/db/iid', false),
    });
    assert(iid > 0);
    // insert
    let data = await ctx.meta.util.performAction({
      innerAccess: false,
      method: 'post',
      url: mockUrl('/a/base/db/insert', false),
      body: {
        tableName: 'testParty',
        data: {
          iid,
          deleted: 0,
          personCount: 8,
        },
      },
    });
    const partyId = data.insertId;
    // select
    data = await ctx.meta.util.performAction({
      innerAccess: false,
      method: 'post',
      url: mockUrl('/a/base/db/select', false),
      body: {
        tableName: 'testParty',
        options: {
          where: {
            id: partyId,
          },
        },
      },
    });
    assert.equal(data[0].id, partyId);
    assert.equal(data[0].personCount, 8);
    // update
    data = await ctx.meta.util.performAction({
      innerAccess: false,
      method: 'post',
      url: mockUrl('/a/base/db/update', false),
      body: {
        tableName: 'testParty',
        data: {
          id: partyId,
          personCount: 9,
        },
      },
    });
    assert.equal(data.affectedRows, 1);
    // get
    data = await ctx.meta.util.performAction({
      innerAccess: false,
      method: 'post',
      url: mockUrl('/a/base/db/get', false),
      body: {
        tableName: 'testParty',
        where: {
          id: partyId,
        },
      },
    });
    assert.equal(data.id, partyId);
    assert.equal(data.personCount, 9);
    // count
    data = await ctx.meta.util.performAction({
      innerAccess: false,
      method: 'post',
      url: mockUrl('/a/base/db/count', false),
      body: {
        tableName: 'testParty',
        where: {
          id: partyId,
        },
      },
    });
    assert.equal(data, 1);
    // delete
    data = await ctx.meta.util.performAction({
      innerAccess: false,
      method: 'post',
      url: mockUrl('/a/base/db/delete', false),
      body: {
        tableName: 'testParty',
        where: {
          id: partyId,
        },
      },
    });
    assert.equal(data.affectedRows, 1);
    // query
    data = await ctx.meta.util.performAction({
      innerAccess: false,
      method: 'post',
      url: mockUrl('/a/base/db/query', false),
      body: {
        sql: 'select * from testParty where iid=? and id=?',
        params: [iid, partyId],
      },
    });
    assert.equal(data.length, 0);
  });
});
