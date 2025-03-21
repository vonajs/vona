import assert from 'node:assert';
import { describe, it } from 'node:test';
import { app } from 'vona-mock';

describe.only('socket.test.ts', () => {
  it('action:socket', async () => {
    await test();
  });
});

function test() {
  return new Promise(resolve => {
    const ws = new WebSocket(`ws://${app.config.server.listen.hostname}:${app.config.server.listen.port}/cabloy?name=zhennann`);
    ws.onopen = async () => {
      // sendEvent
      ws.sendEvent('default', 'Hello Server!');
      // performAction: success
      const res = await ws.performAction('get', '/');
      assert.equal(res, 'Hello Vona!');
      // performAction: fail
      try {
        await ws.performAction('get', '/__not_found_fail');
      } catch (err: any) {
        assert.equal(err.code, 404);
      }
      ws.close();
      resolve(true);
    };
    ws.onmessage = async event => {
      ws.parseEvent(event);
    };
  });
}
