import { BeanSimple, IMonkeyAppStarted } from 'vona';
import { __ThisModule__ } from './.metadata/this.js';
import { developmentWatchDirs } from './lib/development.js';

export class Monkey extends BeanSimple implements IMonkeyAppStarted {
  async appStarted() {
    this.bean.scope(__ThisModule__).election.elect('development', () => {
      developmentWatchDirs(this.app);
    });
  }
}
