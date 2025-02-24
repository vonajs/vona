import type { IMonkeyAppClosed } from 'vona';
import { BeanSimple } from 'vona';
import { __ThisModule__ } from './.metadata/this.ts';

export class Monkey extends BeanSimple implements IMonkeyAppClosed {
  async appClosed() {
    const scopeSelf = this.bean.scope(__ThisModule__);
    await scopeSelf.service.queue.clearWorkers();
    await scopeSelf.service.queue.clearQueues();
  }
}
