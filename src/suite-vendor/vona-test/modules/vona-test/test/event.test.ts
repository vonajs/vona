import assert from 'assert';
import { app } from 'vona-mock';

describe('event.test.ts', () => {
  it('action:event', async () => {
    await app.bean.executor.mockCtx(async () => {
      const result = await app.bean.scope('vona-test').event.helloEcho.emit({ text: 'hello' }, async () => {
        return 'world';
      });
      assert.equal(result, 'hello world');
    });
  });
});
