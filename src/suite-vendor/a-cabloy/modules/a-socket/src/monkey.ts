import type { IMonkeyAppReady } from 'vona';
import { BeanSimple } from 'vona';
import { __ThisModule__ } from './.metadata/this.ts';

export class Monkey extends BeanSimple implements IMonkeyAppReady {
  async appReady() {
    await this.bean.scope(__ThisModule__).service.socket.appReady();
  }
}
