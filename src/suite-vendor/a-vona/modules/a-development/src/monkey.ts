import type { IMonkeyAppStarted } from 'vona';
import { BeanSimple } from 'vona';
import { __ThisModule__ } from './.metadata/this.ts';
import { developmentWatchDirs } from './lib/development.ts';

export class Monkey extends BeanSimple implements IMonkeyAppStarted {
  async appStarted() {
    this.bean.scope(__ThisModule__).election.elect('development', () => {
      developmentWatchDirs(this.app);
    });
  }
}
