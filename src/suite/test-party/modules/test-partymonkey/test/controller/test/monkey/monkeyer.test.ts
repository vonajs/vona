// eslint-disable-next-line
import { app, mockUrl, mockModuleInfo, assert } from 'vona-mock';

describe('test/controller/test/monkey/monkeyer.test.js', () => {
  it('action:test', async () => {
    // ctx
    const ctx = await app.meta.mockUtil.mockCtx();
    const data = await ctx.app.bean.executor.performAction({
      innerAccess: false,
      method: 'post',
      url: mockUrl('/test/party/test/monkey/monkeyee/test', false),
    });
    assert.equal(data.moduleName, 'test-partymonkey');
    assert.equal(data.monkeyed, true);
  });
});
