// import assert from 'node:assert';
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
      ws.sendEvent('default', 'Hello Server!');
      const res = await ws.performAction('get', '/');
      console.log(res);
      ws.close();
      resolve(true);
    };
  });
}
