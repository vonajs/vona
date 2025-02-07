import { BeanSimple, IMonkeySystem } from 'vona';
import { __ThisModule__ } from './.metadata/this.js';

export class Monkey extends BeanSimple implements IMonkeySystem {
  async appStart() {
    await this.bean.scope(__ThisModule__).service.startup.appStart();
  }
  async appReady() {
    await this.bean.scope(__ThisModule__).service.startup.appReady();
  }
  async appStarted() {}
}
