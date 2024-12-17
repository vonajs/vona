import assert from 'assert';
import { app } from 'vona-mock';

describe.only('event.test.ts', () => {
  it('action:event', async () => {
    await app.bean.executor.mockCtx(async () => {
      // scope
      const scopeTest = app.bean.scope('vona-test');
      const result = await scopeTest.event.helloEcho.emit({ text: 'hello' }, 'world');
      assert.equal(result, 'hello world');
    });
  });
});
