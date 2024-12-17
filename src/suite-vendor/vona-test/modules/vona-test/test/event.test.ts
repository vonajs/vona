import assert from 'assert';
import { app } from 'vona-mock';

describe('event.test.ts', () => {
  it('action:event', async () => {
    await app.bean.executor.mockCtx(async () => {
      const data = { text: 'hello' };
      const result = await app.bean.scope('vona-test').event.helloEcho.emit(data, async () => {
        return 'world';
      });
      assert.equal(result, 'hello world');
    });
  });
});
