import type { IMonkeyAppClose, IMonkeyAppStarted } from 'vona';
import { BeanSimple } from 'vona';
import { __ThisModule__ } from './.metadata/this.ts';
import { developmentWatchDirs } from './lib/development.ts';

export class Monkey extends BeanSimple implements IMonkeyAppStarted, IMonkeyAppClose {
  _fnRelease?: Function;

  async appStarted() {
    this.bean.scope(__ThisModule__).election.obtain('development', fn => {
      this._fnRelease = fn;
      developmentWatchDirs(this.app);
    });
  }

  async appClose() {
    await this._fnRelease?.();
  }
}
