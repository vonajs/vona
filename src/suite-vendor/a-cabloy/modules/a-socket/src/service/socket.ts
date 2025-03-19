import { BeanBase } from 'vona';
import { Service } from 'vona-module-a-web';
import { WebSocketServer } from 'ws';

@Service()
export class ServiceSocket extends BeanBase {
  async appReady() {
    // maybe running in demo
    if (!this.app.server) return;
    // wss
    const wss = new WebSocketServer({ server: this.app.server });
    wss.on('connection', ws => {
      ws.on('error', console.error);
      ws.on('message', data => {
        console.log('received: %s', data);
      });
      ws.send('something');
    });
  }
}
