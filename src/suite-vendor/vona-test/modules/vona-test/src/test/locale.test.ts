import { app, assert, mockModuleInfo } from 'egg-born-mock';

describe.only('locale.test.ts', () => {
  it('action:locale', async () => {
    const moduleInfo = mockModuleInfo();
    await app.meta.mockUtil.mockCtx(
      async ctx => {
        assert.equal(ctx.locale, 'zh-cn');
        // getText
        assert.equal(
          app.meta.locale.getText(false, moduleInfo.relativeName, ctx.locale, 'TestHelloWorld'),
          '您好，世界',
        );
        // scope
        const scopeTest = app.bean.scope('vona-test');
        assert.equal(scopeTest.locale.TestHelloWorld(), '您好，世界');
      },
      { locale: 'zh-cn' },
    );
  });
});
