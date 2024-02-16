// eslint-disable-next-line
import { app, mockUrl, mockInfo, assert } from 'egg-born-mock';

// atomClass
const atomClass = {
  module: 'a-useronline',
  atomClassName: 'userOnlineHistory',
};

describe('test/controller/test/itemOnly/right.test.js', () => {
  it('action:checkRightCreate', async () => {
    // ctx
    const ctx = await app.meta.mockUtil.mockCtx();

    const checkRightCreates = [
      ['Tom', false],
      ['root', false],
    ];
    for (const [userName, right] of checkRightCreates) {
      // login
      await ctx.meta.mockUtil.login({ auth: userName });
      // checkRightCreate
      let data;
      try {
        data = await ctx.meta.util.performAction({
          innerAccess: false,
          method: 'post',
          url: mockUrl('test/itemOnly/checkRightCreate', false),
          body: {
            atomClass,
          },
        });
      } catch (err) {
        assert.equal(right, false);
        assert.equal(err.code, 403);
      }
      if (data) {
        assert.equal(right, true);
        assert.equal(data.id > 0, true);
      }
    }
  });

  it('action:checkRight', async () => {
    // ctx
    const ctx = await app.meta.mockUtil.mockCtx();

    // login
    await ctx.meta.mockUtil.login({ auth: 'Tom' });

    // create
    const itemKey = await ctx.meta.util.performAction({
      innerAccess: false,
      method: 'post',
      url: mockUrl('test/itemOnly/createRaw', false),
      body: {
        atomClass,
      },
    });

    // check right read
    const checkRightReads = [
      ['Tom', false],
      ['root', true],
    ];
    for (const [userName, right] of checkRightReads) {
      // login
      await ctx.meta.mockUtil.login({ auth: userName });
      // checkRightRead
      let data;
      try {
        data = await ctx.meta.util.performAction({
          innerAccess: false,
          method: 'post',
          url: mockUrl('test/itemOnly/checkRightRead', false),
          body: {
            key: itemKey,
            atomClass,
          },
        });
      } catch (err) {
        assert.equal(right, false);
        assert.equal(err.code, 403);
      }
      if (data) {
        assert.equal(right, true);
        assert.equal(data.atomId, itemKey.atomId);
      }
    }

    // check right write
    const checkRightWrites = [
      ['Tom', false],
      ['root', false],
    ];
    for (const [userName, right] of checkRightWrites) {
      // login
      await ctx.meta.mockUtil.login({ auth: userName });
      // checkRightWrite
      let data;
      try {
        data = await ctx.meta.util.performAction({
          innerAccess: false,
          method: 'post',
          url: mockUrl('test/itemOnly/checkRightWrite', false),
          body: {
            key: itemKey,
            atomClass,
          },
        });
      } catch (err) {
        assert.equal(right, false);
        assert.equal(err.code, 403);
      }
      if (data) {
        assert.equal(right, true);
        assert.equal(data.atomId, itemKey.atomId);
      }
    }

    // delete
    await ctx.meta.mockUtil.login({ auth: 'root' });
    await ctx.meta.util.performAction({
      innerAccess: false,
      method: 'post',
      url: mockUrl('/a/base/atom/delete', false),
      body: {
        key: itemKey,
        atomClass,
      },
    });
  });
});
