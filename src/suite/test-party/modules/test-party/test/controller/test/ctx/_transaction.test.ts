import { app, mockUrl, mockModuleInfo, assert } from 'vona-mock';

describe('test/controller/test/ctx/transaction.test.js', () => {
  it('action:transaction:fail', async () => {
    // ctx
    await app.meta.mockUtil.mockCtx(async ctx => {
      // login
      await ctx.meta.mockUtil.login({ auth: 'Tom' });

      // create
      const atomKey = await ctx.meta.util.performAction({
        innerAccess: false,
        method: 'post',
        url: '/api/a/base/atom/write',
        body: {
          atomClass: { module: mockModuleInfo().relativeName, atomClassName: 'party' },
        },
      });

      // try to change info
      const itemNew = {
        atomName: 'test:transaction',
        personCount: 0,
      };
      try {
        await ctx.meta.util.performAction({
          innerAccess: false,
          method: 'post',
          url: mockUrl('test/ctx/transaction'),
          body: {
            key: atomKey,
            item: itemNew,
          },
        });
      } catch (err) {
        assert.equal(err.code, 422);
      }

      // check info
      const item = await ctx.meta.util.performAction({
        innerAccess: false,
        method: 'post',
        url: '/api/a/base/atom/read',
        body: {
          key: atomKey,
        },
      });
      assert.notEqual(item.atomName, itemNew.atomName);
      assert.equal(item.personCount, 0);

      // delete
      await ctx.meta.util.performAction({
        innerAccess: false,
        method: 'post',
        url: '/api/a/base/atom/delete',
        body: {
          key: atomKey,
        },
      });
    });
  });

  it('action:transaction:success', async () => {
    // ctx
    await app.meta.mockUtil.mockCtx(async ctx => {
      // login
      await ctx.meta.mockUtil.login({ auth: 'Tom' });

      // create
      const atomKey = await ctx.meta.util.performAction({
        innerAccess: false,
        method: 'post',
        url: '/api/a/base/atom/write',
        body: {
          atomClass: { module: mockModuleInfo().relativeName, atomClassName: 'party' },
        },
      });

      // try to change info
      const itemNew = {
        atomName: 'test:transaction',
        personCount: 3,
      };
      await ctx.meta.util.performAction({
        innerAccess: false,
        method: 'post',
        url: mockUrl('test/ctx/transaction'),
        body: {
          key: atomKey,
          item: itemNew,
        },
      });

      // check info
      const item = await ctx.meta.util.performAction({
        innerAccess: false,
        method: 'post',
        url: '/api/a/base/atom/read',
        body: {
          key: atomKey,
        },
      });
      assert.equal(item.atomName, itemNew.atomName);
      assert.equal(item.personCount, itemNew.personCount);

      // delete
      await ctx.meta.util.performAction({
        innerAccess: false,
        method: 'post',
        url: '/api/a/base/atom/delete',
        body: {
          key: atomKey,
        },
      });
    });
  });
});
