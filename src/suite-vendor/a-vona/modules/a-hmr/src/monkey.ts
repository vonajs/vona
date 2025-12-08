import type { FunctionAsync, IMonkeyAppClose, IMonkeyAppStarted } from 'vona';
import { BeanSimple } from 'vona';
import { __ThisModule__ } from './.metadata/this.ts';

export class Monkey extends BeanSimple implements IMonkeyAppStarted, IMonkeyAppClose {
  private _fnRelease: FunctionAsync<void> | undefined;

  async appStarted() {
    const scope = this.app.scope(__ThisModule__);
    scope.election.obtain('hmr', fnRelease => {
      this._fnRelease = fnRelease;
      scope.service.watch.start();
    });
  }

  async appClose() {
    const scope = this.app.scope(__ThisModule__);
    await scope.service.watch.stop();
    this._fnRelease?.();
  }
}
