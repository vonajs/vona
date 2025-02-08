import { BeanSimple, IMonkeyAppReady, IMonkeyAppStart } from 'vona';
import { __ThisModule__ } from './.metadata/this.js';

export class Monkey extends BeanSimple implements IMonkeyAppStart, IMonkeyAppReady {
  async appStart() {
    await this.bean.scope(__ThisModule__).service.startup.appStart();
  }
  async appReady() {
    await this.bean.scope(__ThisModule__).service.startup.appReady();
  }
}
