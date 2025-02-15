import type { IMonkeyAppClosed } from 'vona';
import { BeanSimple } from 'vona';

export class Monkey extends BeanSimple implements IMonkeyAppClosed {
  async appClosed() {
    await this.bean.worker.delAlive();
  }
}
