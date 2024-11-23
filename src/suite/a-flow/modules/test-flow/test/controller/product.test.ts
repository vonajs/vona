// eslint-disable-next-line
import { app, mockUrl, mockModuleInfo, assert } from 'egg-born-mock';

describe('atom:product', () => {
  it('atom', async () => {
    // ctx
    const ctx = await app.meta.mockUtil.mockCtx();

    // atomClass info
    const atomClassModule = mockModuleInfo().relativeName;
    const atomClassName = 'product';
    const atomClass = { module: atomClassModule, atomClassName };

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
          productCode: 'test:321',
          productPrice: 321,
        },
      },
    });
    assert(!!keyDraft);

    // submit
    let data = await ctx.meta.util.performAction({
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
