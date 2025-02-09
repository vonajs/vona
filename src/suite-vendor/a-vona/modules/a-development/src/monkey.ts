import { BeanSimple, IMonkeyAppStarted } from 'vona';
import { __ThisModule__ } from './.metadata/this.js';

export class Monkey extends BeanSimple implements IMonkeyAppStarted {
  async appStarted() {
    this.bean.scope(__ThisModule__).election.elect('development', async () => {
      console.log('----------------:', this.bean.worker.id);
    });
  }
}
