import type { IMonkeyAppStarted } from 'vona';
import { BeanSimple } from 'vona';
import { __ThisModule__ } from './.metadata/this.ts';

export class Monkey extends BeanSimple implements IMonkeyAppStarted {
  async appStarted() {
    const scope = this.app.scope(__ThisModule__);
    scope.election.obtain('hmr', async () => {
      await scope.service.watch.start();
      // eslint-disable-next-line
      console.log(`[hmr] ready: ${process.pid}`);
    }, async () => {
      await scope.service.watch.stop();
    });
  }
}
