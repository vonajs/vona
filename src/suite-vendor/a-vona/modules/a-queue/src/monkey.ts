import type { IMonkeyAppClosed } from 'vona';
import { BeanSimple } from 'vona';
import { __ThisModule__ } from './.metadata/this.ts';

export class Monkey extends BeanSimple implements IMonkeyAppClosed {
  async appClosed() {
    await this.bean.scope(__ThisModule__).service.queue.clearWorkers();
  }
}
