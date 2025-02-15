import { BeanSimple, type IModuleMain } from 'vona';
import { __ThisModule__ } from './.metadata/this.js';

export class Main extends BeanSimple implements IModuleMain {
  async moduleLoading() {}
  async moduleLoaded() {
    const scope = this.bean.scope(__ThisModule__);
    const aliveTimeout = scope.config.worker.alive.timeout;
    // interval
    setInterval(async () => {
      await this.app.bean.worker.setAlive();
    }, aliveTimeout);
    // alive
    await this.app.bean.worker.setAlive();
  }

  async configLoaded(_config: any) {}
}
