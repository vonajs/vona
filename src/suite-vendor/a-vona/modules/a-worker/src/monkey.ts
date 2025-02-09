import { BeanSimple, IMonkeyAppClosed } from 'vona';
import { __ThisModule__ } from './.metadata/this.js';

export class Monkey extends BeanSimple implements IMonkeyAppClosed {
  async appClosed() {
    await this.bean.worker.delAlive();
  }
}
