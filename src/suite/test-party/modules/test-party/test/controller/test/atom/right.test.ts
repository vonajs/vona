// eslint-disable-next-line
import { app, mockUrl, mockModuleInfo, assert } from 'vona-mock';

describe('test/controller/test/atom/right.test.js', () => {
  it('action:checkRightCreate', async () => {
    // ctx
    const ctx = await app.meta.mockUtil.mockCtx();

    const checkRightCreates = [
      ['Tom', true],
      ['Jimmy', true],
      ['Smith', false],
    ];
    for (const [userName, right] of checkRightCreates) {
      // login
      await ctx.meta.mockUtil.login({ auth: userName });
      // checkRightCreate
      await ctx.meta.mockUtil.catchError(
        async function () {
          return await ctx.app.bean.executor.performAction({
            innerAccess: false,
            method: 'post',
            url: mockUrl('test/atom/checkRightCreate', false),
            body: {
              atomClass: { module: mockModuleInfo().relativeName, atomClassName: 'party' },
            },
          });
        },
        async function (err, data) {
          if (right) {
            assert.equal(data.id > 0, true);
          } else {
            assert.equal(err.code, 403);
          }
        },
      );
    }
  });

  it('action:checkRight', async () => {
    // ctx
    const ctx = await app.meta.mockUtil.mockCtx();

    // login
    await ctx.meta.mockUtil.login({ auth: 'Tom' });

    // create
    const partyKeyDraft = await ctx.app.bean.executor.performActionrmAction({
      innerAccess: false,
      method: 'post',
      url: mockUrl('/a/base/atom/write', false),
      body: {
        atomClass: { module: mockModuleInfo().relativeName, atomClassName: 'party' },
      },
    });

    // check right read
    const checkRightReads = [
      ['Tom', true],
      ['Tomson', false],
    ];
    for (const [userName, right] of checkRightReads) {
      // login
      await ctx.meta.mockUtil.login({ auth: userName });
      // checkRightRead
      await ctx.meta.mockUtil.catchError(
        async function () {
          return await ctx.app.bean.executor.performActionrmAction({
            innerAccess: false,
            method: 'post',
            url: mockUrl('test/atom/checkRightRead', false),
            body: {
              key: partyKeyDraft,
            },
          });
        },
        async function (err, data) {
          if (right) {
            assert.equal(data.atomId, partyKeyDraft.atomId);
          } else {
            assert.equal(err.code, 403);
          }
        },
      );
    }

    // check right write
    const checkRightWrites = [
      ['Tom', true],
      ['Tomson', false],
    ];
    for (const [userName, right] of checkRightWrites) {
      // login
      await ctx.meta.mockUtil.login({ auth: userName });
      // checkRightWrite
      await ctx.meta.mockUtil.catchError(
        async function () {
          return await ctx.app.bean.executor.performActionrmAction({
            innerAccess: false,
            method: 'post',
            url: mockUrl('test/atom/checkRightWrite', false),
            body: {
              key: partyKeyDraft,
            },
          });
        },
        async function (err, data) {
          if (right) {
            assert.equal(data.atomId, partyKeyDraft.atomId);
          } else {
            assert.equal(err.code, 403);
          }
        },
      );
    }

    // submit
    await ctx.meta.mockUtil.login({ auth: 'Tom' });
    const data = await ctx.app.bean.executor.performActionrmAction({
      innerAccess: false,
      method: 'post',
      url: mockUrl('/a/base/atom/submit', false),
      body: {
        key: partyKeyDraft,
      },
    });
    const partyKeyFormal = data.formal.key;

    // // check right actions
    // const checkRightActions = [
    //   [ 'Tom', false ],
    //   [ 'Jane', true ],
    // ];
    // for (const [ userName, right ] of checkRightActions) {
    //   // login
    //   await app.httpRequest().post(mockUrl('/a/auth/passport/a-authsimple/authsimple')).send({
    //     data: {
    //       auth: userName,
    //       password: '123456',
    //     },
    //   });
    //   // checkRightAction
    //   const result = await app.httpRequest().post(mockUrl('test/atom/checkRightAction')).send({
    //     key: partyKeyFormal,
    //   });
    //   if (right) {
    //     assert.equal(result.body.data.atomId, partyKeyFormal.atomId);
    //   } else {
    //     assert.equal(result.status, 403);
    //   }
    // }

    // // customActionReview
    // const customActionReviews = [
    //   [ 'Tom', false ],
    //   [ 'Jane', true ],
    // ];
    // for (const [ userName, right ] of customActionReviews) {
    //   // login
    //   await app.httpRequest().post(mockUrl('/a/auth/passport/a-authsimple/authsimple')).send({
    //     data: {
    //       auth: userName,
    //       password: '123456',
    //     },
    //   });
    //   // action:review
    //   const result = await app.httpRequest().post(mockUrl('/a/base/atom/action')).send({
    //     key: partyKey,
    //     action: 101,
    //   });
    //   if (right) {
    //     assert.equal(result.body.code, 0);
    //   } else {
    //     assert.equal(result.status, 403);
    //   }
    // }

    // delete
    await ctx.meta.mockUtil.login({ auth: 'Tom' });
    await ctx.app.bean.executor.performActionrmAction({
      innerAccess: false,
      method: 'post',
      url: mockUrl('/a/base/atom/delete', false),
      body: {
        key: partyKeyFormal,
      },
    });
  });
});
