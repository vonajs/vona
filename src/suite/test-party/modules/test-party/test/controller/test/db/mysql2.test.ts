// eslint-disable-next-line
import { app, mockUrl, mockModuleInfo, assert } from 'vona-mock';

describe.skip('test/controller/test/feat/mysql2.test.js', () => {
  it('action:mysql2', async () => {
    // ctx
    const ctx = await app.meta.mockUtil.mockCtx();

    // atomClass info
    const atomClassModule = mockModuleInfo().relativeName;
    const atomClassName = 'party';

    // login as root
    await ctx.meta.mockUtil.login({ auth: 'root' });

    // create
    const keyDraft = await ctx.app.bean.executor.performAction({
      innerAccess: false,
      method: 'post',
      url: '/api/a/base/atom/write',
      body: {
        atomClass: { module: atomClassModule, atomClassName },
      },
    });

    // query
    let data = await ctx.app.bean.executor.performActionrmAction({
      innerAccess: false,
      method: 'post',
      url: '/api/a/base/db/queryOne',
      body: {
        sql: 'select a.*,b.* from aAtom a, testParty b where a.id=b.atomId and a.id=?',
        params: [keyDraft.atomId],
      },
    });
    assert.equal(data.id, keyDraft.itemId);

    // query
    data = await ctx.app.bean.executor.performActionrmAction({
      innerAccess: false,
      method: 'post',
      url: '/api/a/base/db/queryOne',
      body: {
        sql: 'select b.*,a.* from aAtom a, testParty b where a.id=b.atomId and a.id=?',
        params: [keyDraft.atomId],
      },
    });
    assert.equal(data.id, keyDraft.atomId);

    // delete
    await ctx.app.bean.executor.performActionrmAction({
      innerAccess: false,
      method: 'post',
      url: '/api/a/base/atom/delete',
      body: {
        key: keyDraft,
      },
    });
  });
});
