import { app, assert, mockModuleInfo } from 'egg-born-mock';

describe.only('locale.test.ts', () => {
  it('action:locale', async () => {
    const moduleInfo = mockModuleInfo();
    await app.meta.mockUtil.mockCtx(async ctx => {
      // getText
      assert.equal(app.meta.locale.getText(false, moduleInfo.relativeName, ctx.locale, 'TestLocale'), 'TestLocale');
      // scope
      const scopeTest = app.bean.scope('');
    });
  });
});
