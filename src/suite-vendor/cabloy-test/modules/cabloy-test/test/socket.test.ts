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
    ws.sendEvent = (eventName: keyof ISocketCabloyEventRecord, data, cb) => {
      const packet: TypeSocketPacketCabloy = [eventName, data];
      ws.send(JSON.stringify(packet), cb);
    };
    ws.onopen = () => {
      ws.send('Hello Server!');
      ws.close();
      resolve(true);
    };
  });
}
