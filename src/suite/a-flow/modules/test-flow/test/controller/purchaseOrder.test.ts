// eslint-disable-next-line
import { app, mockUrl, mockModuleInfo, assert } from 'vona-mock';

describe('atom:purchaseOrder', () => {
  it('atom', async () => {
    // ctx
    const ctx = await app.meta.mockUtil.mockCtx();

    // atomClass info
    const atomClassModule = mockModuleInfo().relativeName;
    const atomClassName = 'purchaseOrder';
    const atomClass = { module: atomClassModule, atomClassName };

    // detailClass info
    const detailClassName = 'purchaseOrderDetail';

    // login as root
    await ctx.meta.mockUtil.login({ auth: 'root' });

    // create
    const keyDraft = await ctx.meta.util.performAction({
      innerAccess: false,
      method: 'post',
      url: '/api/a/base/atom/write',
      body: {
        atomClass,
        item: {
          atomName: 'test',
          description: 'this is a test',
        },
      },
    });
    assert(!!keyDraft);

    // detail: create
    const detailKey = await ctx.meta.util.performAction({
      innerAccess: false,
      method: 'post',
      url: '/api/a/base/atom/write',
      body: {
        atomClass: {
          module: atomClassModule,
          atomClassName: detailClassName,
        },
        item: {
          detailCode: 'test:321',
          detailName: 'test',
          price: 321,
          quantity: 2,
        },
        options: {
          atomIdMain: keyDraft.atomId,
        },
      },
    });
    assert(!!keyDraft);

    // detail: read
    let data = await ctx.meta.util.performAction({
      innerAccess: false,
      method: 'post',
      url: '/api/a/base/atom/read',
      body: {
        key: detailKey,
        atomClass: {
          module: atomClassModule,
          atomClassName: detailClassName,
        },
      },
    });
    assert(!!data);

    // detail: select
    data = await ctx.meta.util.performAction({
      innerAccess: false,
      method: 'post',
      url: '/api/a/base/atom/select',
      body: {
        atomClass: {
          module: atomClassModule,
          atomClassName: detailClassName,
        },
        options: {
          atomIdMain: keyDraft.atomId,
        },
      },
    });
    assert(!!data);

    // detail: count
    data = await ctx.meta.util.performAction({
      innerAccess: false,
      method: 'post',
      url: '/api/a/base/atom/count',
      body: {
        atomClass: {
          module: atomClassModule,
          atomClassName: detailClassName,
        },
        options: {
          atomIdMain: keyDraft.atomId,
        },
      },
    });
    assert.equal(data, 1);

    // // detail: delete
    // result = await app.httpRequest().post(mockUrl('/a/detail/detail/delete')).send({
    //   key: detailKey,
    // });
    // assert(result.body.code === 0);

    // submit
    data = await ctx.meta.util.performAction({
      innerAccess: false,
      method: 'post',
      url: '/api/a/base/atom/submit',
      body: {
        key: keyDraft,
        atomClass,
      },
    });
    const keyFormal = data.formal.key;
    assert(!!keyFormal);

    // read
    data = await ctx.meta.util.performAction({
      innerAccess: false,
      method: 'post',
      url: '/api/a/base/atom/read',
      body: {
        key: keyFormal,
        atomClass,
      },
    });
    assert(!!data);

    // delete
    await ctx.meta.util.performAction({
      innerAccess: false,
      method: 'post',
      url: '/api/a/base/atom/delete',
      body: {
        key: keyFormal,
        atomClass,
      },
    });
  });
});
