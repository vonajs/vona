import type { IMonkeyAppClose, IMonkeyAppStarted } from 'vona';
import { BeanSimple } from 'vona';
import { __ThisModule__ } from './.metadata/this.ts';

export class Monkey extends BeanSimple implements IMonkeyAppStarted, IMonkeyAppClose {
  async appStarted() {
    const scope = this.app.scope(__ThisModule__);
    scope.election.obtain('hmr', () => {
      scope.service.watch.start();
    });
  }

  async appClose() {
    const scope = this.app.scope(__ThisModule__);
    await scope.service.watch.stop();
    await scope.election.release('hmr');
  }
}
